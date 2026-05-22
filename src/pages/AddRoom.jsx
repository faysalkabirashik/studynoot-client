import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../utils/api'
import useTitle from '../hooks/useTitle'
import RoomForm from '../components/RoomForm'

const AddRoom = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useTitle('Add Room')

  const handleSubmit = async (roomData) => {
    setLoading(true)
    try {
      await api.post('/api/rooms', roomData)
      toast.success('Room added successfully')
      navigate('/my-listings')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add room')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container-pad py-14">
      <div className="mx-auto max-w-3xl rounded-lg bg-[#f3f4f6] p-6 dark:bg-[#1f2937] md:p-8">
        <h1 className="section-title">Add Room</h1>
        <p className="section-text mt-3 mb-8">Create a study room listing. You will be saved as the owner.</p>
        <RoomForm submitLabel="Add Room" onSubmit={handleSubmit} loading={loading} />
      </div>
    </section>
  )
}

export default AddRoom
