import { useEffect, useState } from 'react'
import api from '../utils/api'
import { amenitiesList } from '../utils/constants'
import useTitle from '../hooks/useTitle'
import Spinner from '../components/Spinner'
import RoomGrid from '../components/RoomGrid'

const Rooms = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    floor: '',
    minRate: '',
    maxRate: '',
    amenities: [],
  })
  useTitle('Available Rooms')

  const loadRooms = async () => {
    setLoading(true)
    try {
      const params = {
        search: filters.search,
        floor: filters.floor,
        minRate: filters.minRate,
        maxRate: filters.maxRate,
        amenities: filters.amenities.join(','),
      }
      const { data } = await api.get('/api/rooms', { params })
      setRooms(data)
    } catch {
      setRooms([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRooms()
  }, [])

  const updateFilter = (name, value) => {
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }))
  }

  const toggleAmenity = (amenity) => {
    setFilters((currentFilters) => {
      const exists = currentFilters.amenities.includes(amenity)
      const amenities = exists
        ? currentFilters.amenities.filter((item) => item !== amenity)
        : [...currentFilters.amenities, amenity]
      return { ...currentFilters, amenities }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    loadRooms()
  }

  const clearFilters = () => {
    setFilters({ search: '', floor: '', minRate: '', maxRate: '', amenities: [] })
    setTimeout(loadRooms, 0)
  }

  return (
    <section className="container-pad py-14">
      <div className="mb-8">
        <h1 className="section-title">Available Rooms</h1>
        <p className="section-text mt-3 max-w-2xl">
          Search by room name and filter by amenities, floor, and hourly rate.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-10 rounded-lg bg-[#f3f4f6] p-5 dark:bg-[#1f2937]">
        <div className="grid gap-4 lg:grid-cols-4">
          <input className="form-field" placeholder="Search room name" value={filters.search} onChange={(event) => updateFilter('search', event.target.value)} />
          <input className="form-field" placeholder="Floor" value={filters.floor} onChange={(event) => updateFilter('floor', event.target.value)} />
          <input className="form-field" type="number" placeholder="Min rate" value={filters.minRate} onChange={(event) => updateFilter('minRate', event.target.value)} />
          <input className="form-field" type="number" placeholder="Max rate" value={filters.maxRate} onChange={(event) => updateFilter('maxRate', event.target.value)} />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 rounded-full border border-[#d6e1da] px-4 py-2 text-sm font-bold dark:border-[#31463a]">
              <input type="checkbox" checked={filters.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} className="accent-[#1f7a4c]" />
              {amenity}
            </label>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="primary-btn">Apply Search & Filter</button>
          <button type="button" onClick={clearFilters} className="secondary-btn">Clear</button>
        </div>
      </form>

      {loading ? <Spinner label="Fetching rooms..." /> : <RoomGrid rooms={rooms} />}
    </section>
  )
}

export default Rooms
