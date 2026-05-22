import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import useTitle from '../hooks/useTitle'
import Spinner from '../components/Spinner'
import Modal from '../components/Modal'
import RoomForm from '../components/RoomForm'

const MyListings = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [deleteRoom, setDeleteRoom] = useState(null)
  const [saving, setSaving] = useState(false)
  useTitle('My Listings')

  const loadRooms = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/api/my-listings')
      setRooms(data)
    } catch {
      toast.error('Failed to load your listings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRooms()
  }, [])

  const handleUpdate = async (roomData) => {
    setSaving(true)
    try {
      await api.patch(`/api/rooms/${selectedRoom._id}`, roomData)
      toast.success('Room updated successfully')
      setSelectedRoom(null)
      loadRooms()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Room update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/api/rooms/${deleteRoom._id}`)
      toast.success('Room deleted successfully')
      setDeleteRoom(null)
      loadRooms()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Room delete failed')
    }
  }

  return (
    <section className="container-pad py-14">
      <h1 className="section-title">My Listings</h1>
      <p className="section-text mt-3 mb-8">Manage rooms that you created.</p>

      {loading ? (
        <Spinner label="Fetching your listings..." />
      ) : rooms.length ? (
        <div className="grid gap-5">
          {rooms.map((room) => (
            <article key={room._id} className="grid gap-5 rounded-lg bg-white p-5 dark:bg-[#1f2937] md:grid-cols-[220px_1fr_auto]">
              <img src={room.image} alt={room.roomName} className="h-40 w-full rounded-lg object-cover md:w-56" />
              <div>
                <h2 className="text-2xl font-black">{room.roomName}</h2>
                <p className="section-text mt-2 text-clamp">{room.description}</p>
                <p className="mt-3 font-bold text-[#1f7a4c]">${room.hourlyRate}/hr · {room.capacity} people · {room.floor}</p>
              </div>
              <div className="flex flex-col gap-3 md:w-36">
                <button type="button" onClick={() => setSelectedRoom(room)} className="secondary-btn">Edit</button>
                <button type="button" onClick={() => setDeleteRoom(room)} className="secondary-btn text-red-600">Delete</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#b9cabe] bg-white p-10 text-center dark:border-[#31463a] dark:bg-[#142019]">
          <h2 className="text-2xl font-black">You have no listings yet.</h2>
          <p className="section-text mt-2">Add a room to start receiving bookings.</p>
        </div>
      )}

      {selectedRoom && (
        <Modal title="Update Listing" onClose={() => setSelectedRoom(null)}>
          <RoomForm initialRoom={selectedRoom} submitLabel="Update Room" onSubmit={handleUpdate} loading={saving} />
        </Modal>
      )}

      {deleteRoom && (
        <Modal title="Delete Listing" onClose={() => setDeleteRoom(null)} size="max-w-md">
          <p className="section-text">Are you sure you want to delete {deleteRoom.roomName}?</p>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={handleDelete} className="primary-btn bg-red-600 hover:bg-red-700">Confirm Delete</button>
            <button type="button" onClick={() => setDeleteRoom(null)} className="secondary-btn">Cancel</button>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default MyListings
