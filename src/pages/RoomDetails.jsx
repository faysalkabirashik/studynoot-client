import { useEffect, useState } from 'react'
import { CalendarPlus, Layers, Trash2, Users, WalletCards } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import useTitle from '../hooks/useTitle'
import Spinner from '../components/Spinner'
import Modal from '../components/Modal'
import RoomForm from '../components/RoomForm'
import BookingModal from '../components/BookingModal'

const RoomDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  useTitle(room?.roomName || 'Room Details')

  const loadRoom = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/api/rooms/${id}`)
      setRoom(data)
    } catch {
      toast.error('Room not found')
      navigate('/rooms')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRoom()
  }, [id])

  const isOwner = user && room?.ownerId === user._id

  const handleBookClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location } })
      return
    }
    setBookingOpen(true)
  }

  const handleUpdate = async (roomData) => {
    setSaving(true)
    try {
      await api.patch(`/api/rooms/${room._id}`, roomData)
      toast.success('Room updated successfully')
      setEditOpen(false)
      loadRoom()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Room update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/api/rooms/${room._id}`)
      toast.success('Room deleted successfully')
      navigate('/rooms')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Room delete failed')
    }
  }

  if (loading) {
    return <Spinner label="Fetching room details..." />
  }

  if (!room) {
    return null
  }

  return (
    <section className="container-pad py-14">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <img src={room.image} alt={room.roomName} className="h-[520px] w-full rounded-lg object-cover" />

        <div>
          <h1 className="section-title">{room.roomName}</h1>
          <p className="section-text mt-5">{room.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[#dce8df] bg-white p-5 dark:border-[#283a30] dark:bg-[#142019]">
              <Layers className="text-[#1f7a4c]" />
              <p className="mt-3 font-black">{room.floor}</p>
            </div>
            <div className="rounded-lg border border-[#dce8df] bg-white p-5 dark:border-[#283a30] dark:bg-[#142019]">
              <Users className="text-[#1f7a4c]" />
              <p className="mt-3 font-black">{room.capacity} people</p>
            </div>
            <div className="rounded-lg border border-[#dce8df] bg-white p-5 dark:border-[#283a30] dark:bg-[#142019]">
              <WalletCards className="text-[#1f7a4c]" />
              <p className="mt-3 font-black">${room.hourlyRate}/hr</p>
            </div>
            <div className="rounded-lg border border-[#dce8df] bg-white p-5 dark:border-[#283a30] dark:bg-[#142019]">
              <CalendarPlus className="text-[#1f7a4c]" />
              <p className="mt-3 font-black">{room.bookingCount || 0} bookings</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {room.amenities?.map((amenity) => (
              <span key={amenity} className="rounded-full bg-[#e9f5ed] px-4 py-2 text-sm font-bold text-[#1f7a4c] dark:bg-[#20362a] dark:text-[#8ee0aa]">
                {amenity}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleBookClick} className="primary-btn">
              {user ? 'Book Now' : 'Login to Book'}
            </button>
            {isOwner && (
              <>
                <button type="button" onClick={() => setEditOpen(true)} className="secondary-btn">Edit Room</button>
                <button type="button" onClick={() => setDeleteOpen(true)} className="secondary-btn text-red-600">
                  <Trash2 size={18} /> Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {bookingOpen && <BookingModal room={room} onClose={() => setBookingOpen(false)} onBooked={loadRoom} />}

      {editOpen && (
        <Modal title="Update Room" onClose={() => setEditOpen(false)}>
          <RoomForm initialRoom={room} submitLabel="Update Room" onSubmit={handleUpdate} loading={saving} />
        </Modal>
      )}

      {deleteOpen && (
        <Modal title="Delete Room" onClose={() => setDeleteOpen(false)} size="max-w-md">
          <p className="section-text">Are you sure you want to permanently delete this room?</p>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={handleDelete} className="primary-btn bg-red-600 hover:bg-red-700">Confirm Delete</button>
            <button type="button" onClick={() => setDeleteOpen(false)} className="secondary-btn">Cancel</button>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default RoomDetails
