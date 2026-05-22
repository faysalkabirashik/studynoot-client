import { ArrowRight, Layers, Users, WalletCards } from 'lucide-react'
import { Link } from 'react-router-dom'

const RoomCard = ({ room }) => {
  const visibleAmenities = room.amenities?.slice(0, 3) || []
  const hiddenCount = Math.max((room.amenities?.length || 0) - 3, 0)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-white transition-all duration-200 hover:scale-[1.015] hover:bg-[#f8fafc] dark:bg-[#1f2937] dark:hover:bg-[#243244]">
      <img
        src={room.image}
        alt={room.roomName}
        className="h-52 w-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-extrabold tracking-[-0.02em] text-[#111827] dark:text-white">{room.roomName}</h3>
        <p className="text-clamp mt-3 text-sm leading-6 text-[#4b5563] dark:text-[#d1d5db]">
          {room.description}
        </p>

        <div className="mt-5 grid gap-3 text-sm font-semibold text-[#374151] dark:text-[#e5e7eb]">
          <span className="flex items-center gap-2">
            <Layers size={17} /> {room.floor}
          </span>
          <span className="flex items-center gap-2">
            <Users size={17} /> {room.capacity} people
          </span>
          <span className="flex items-center gap-2">
            <WalletCards size={17} /> ${room.hourlyRate}/hr
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {visibleAmenities.map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-bold text-[#1d4ed8] dark:bg-[#1e3a8a] dark:text-[#bfdbfe]"
            >
              {amenity}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-bold text-[#4b5563] dark:bg-[#374151] dark:text-[#e5e7eb]">
              +{hiddenCount} more
            </span>
          )}
        </div>

        <Link to={`/rooms/${room._id}`} className="primary-btn mt-auto w-full">
          View Details <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  )
}

export default RoomCard
