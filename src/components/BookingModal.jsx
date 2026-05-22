import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { timeSlots } from '../utils/constants'
import Modal from './Modal'

const todayText = new Date().toISOString().split('T')[0]

const getHour = (time) => Number(time.split(':')[0])

const BookingModal = ({ room, onClose, onBooked }) => {
  const [date, setDate] = useState(todayText)
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('09:00')
  const [specialNote, setSpecialNote] = useState('')
  const [loading, setLoading] = useState(false)

  const endOptions = useMemo(() => {
    return timeSlots.filter((time) => getHour(time) > getHour(startTime))
  }, [startTime])

  const totalCost = (getHour(endTime) - getHour(startTime)) * Number(room.hourlyRate)

  const handleStartTime = (event) => {
    const nextStart = event.target.value
    setStartTime(nextStart)
    const nextEnd = timeSlots.find((time) => getHour(time) > getHour(nextStart))
    setEndTime(nextEnd || '20:00')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await api.post('/api/bookings', {
        roomId: room._id,
        date,
        startTime,
        endTime,
        totalCost,
        specialNote,
      })
      toast.success('Room booked successfully!')
      onBooked()
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title={`Book ${room.roomName}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-2">
          <label className="font-bold">Date</label>
          <input className="form-field" type="date" min={todayText} value={date} onChange={(event) => setDate(event.target.value)} required />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="font-bold">Start Time</label>
            <select className="form-field" value={startTime} onChange={handleStartTime}>
              {timeSlots.slice(0, -1).map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="font-bold">End Time</label>
            <select className="form-field" value={endTime} onChange={(event) => setEndTime(event.target.value)}>
              {endOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-lg bg-[#e9f5ed] p-4 text-lg font-extrabold text-[#1f7a4c] dark:bg-[#20362a] dark:text-[#8ee0aa]">
          Total Cost: ${totalCost}
        </div>

        <div className="grid gap-2">
          <label className="font-bold">Special Note</label>
          <textarea className="form-field min-h-24" value={specialNote} onChange={(event) => setSpecialNote(event.target.value)} placeholder="Optional note for the room owner" />
        </div>

        <button type="submit" className="primary-btn w-full" disabled={loading}>
          {loading ? 'Confirming...' : 'Confirm Booking'}
        </button>
      </form>
    </Modal>
  )
}

export default BookingModal
