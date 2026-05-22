import { useState } from 'react'
import { amenitiesList } from '../utils/constants'

const emptyRoom = {
  roomName: '',
  description: '',
  image: '',
  floor: '',
  capacity: '',
  hourlyRate: '',
  amenities: [],
}

const RoomForm = ({ initialRoom, submitLabel = 'Save Room', onSubmit, loading }) => {
  const [formData, setFormData] = useState(initialRoom || emptyRoom)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleAmenity = (amenity) => {
    setFormData((currentData) => {
      const exists = currentData.amenities.includes(amenity)
      const amenities = exists
        ? currentData.amenities.filter((item) => item !== amenity)
        : [...currentData.amenities, amenity]

      return { ...currentData, amenities }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <label className="font-bold">Room Name</label>
        <input className="form-field" name="roomName" value={formData.roomName} onChange={handleChange} required />
      </div>

      <div className="grid gap-2">
        <label className="font-bold">Description</label>
        <textarea className="form-field min-h-32" name="description" value={formData.description} onChange={handleChange} required />
      </div>

      <div className="grid gap-2">
        <label className="font-bold">Image URL</label>
        <input className="form-field" name="image" value={formData.image} onChange={handleChange} required />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="grid gap-2">
          <label className="font-bold">Floor</label>
          <input className="form-field" name="floor" value={formData.floor} onChange={handleChange} required />
        </div>
        <div className="grid gap-2">
          <label className="font-bold">Capacity</label>
          <input className="form-field" type="number" min="1" name="capacity" value={formData.capacity} onChange={handleChange} required />
        </div>
        <div className="grid gap-2">
          <label className="font-bold">Hourly Rate</label>
          <input className="form-field" type="number" min="1" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid gap-3">
        <label className="font-bold">Amenities</label>
        <div className="grid gap-3 sm:grid-cols-2">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 rounded-lg border border-[#d6e1da] bg-white p-3 dark:border-[#31463a] dark:bg-[#101a14]">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={() => handleAmenity(amenity)}
                className="h-4 w-4 accent-[#1f7a4c]"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="primary-btn w-full" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}

export default RoomForm
