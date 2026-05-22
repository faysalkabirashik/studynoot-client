import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import useTitle from '../hooks/useTitle'
import Spinner from '../components/Spinner'
import Modal from '../components/Modal'

const isFutureOrToday = (dateText) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const bookingDate = new Date(`${dateText}T00:00:00`)
  return bookingDate >= today
}

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  useTitle('My Bookings')

  const loadBookings = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/api/bookings/my-bookings')
      setBookings(data)
    } catch {
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const handleCancel = async () => {
    try {
      await api.patch(`/api/bookings/${selectedBooking._id}/cancel`)
      toast.success('Booking cancelled')
      setSelectedBooking(null)
      loadBookings()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Cancel failed')
    }
  }

  return (
    <section className="container-pad py-14">
      <h1 className="section-title">My Bookings</h1>
      <p className="section-text mt-3 mb-8">Track and cancel your own confirmed future bookings.</p>

      {loading ? (
        <Spinner label="Fetching your bookings..." />
      ) : bookings.length ? (
        <div className="overflow-hidden rounded-lg bg-white dark:bg-[#1f2937]">
          <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 border-b border-[#dce8df] bg-[#eef7f1] p-4 font-black dark:border-[#283a30] dark:bg-[#20362a] lg:grid">
            <span>Room</span>
            <span>Date</span>
            <span>Time</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          {bookings.map((booking) => {
            const canCancel = booking.status === 'confirmed' && isFutureOrToday(booking.date)
            return (
              <div key={booking._id} className="grid gap-4 border-b border-[#edf1ee] p-4 last:border-0 dark:border-[#26382e] lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={booking.room?.image || 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop'}
                    alt={booking.room?.roomName || 'Deleted room'}
                    className="h-20 w-24 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="font-black">{booking.room?.roomName || 'Room removed'}</h2>
                    <p className="text-sm text-[#5d6f64] dark:text-[#b7c8bd]">Cost: ${booking.totalCost}</p>
                  </div>
                </div>
                <p className="font-bold">{booking.date}</p>
                <p className="font-bold">{booking.startTime} - {booking.endTime}</p>
                <span className={`w-fit rounded-full px-3 py-1 text-sm font-black ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300'}`}>
                  {booking.status}
                </span>
                {canCancel ? (
                  <button type="button" onClick={() => setSelectedBooking(booking)} className="secondary-btn text-red-600">Cancel</button>
                ) : (
                  <span className="text-sm font-semibold text-[#5d6f64] dark:text-[#b7c8bd]">No action</span>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#b9cabe] bg-white p-10 text-center dark:border-[#31463a] dark:bg-[#142019]">
          <h2 className="text-2xl font-black">You have no bookings yet.</h2>
          <p className="section-text mt-2">Browse rooms and reserve your first study slot.</p>
        </div>
      )}

      {selectedBooking && (
        <Modal title="Cancel Booking" onClose={() => setSelectedBooking(null)} size="max-w-md">
          <p className="section-text">Are you sure you want to cancel this booking?</p>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={handleCancel} className="primary-btn bg-red-600 hover:bg-red-700">Confirm Cancel</button>
            <button type="button" onClick={() => setSelectedBooking(null)} className="secondary-btn">Keep Booking</button>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default MyBookings
