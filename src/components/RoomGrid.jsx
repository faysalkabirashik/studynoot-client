import RoomCard from './RoomCard'

const RoomGrid = ({ rooms }) => {
  if (!rooms.length) {
    return (
      <div className="rounded-xl border border-dashed border-[#b9cabe] bg-white p-10 text-center dark:border-[#31463a] dark:bg-[#142019]">
        <h3 className="text-2xl font-bold text-[#17211a] dark:text-white">No rooms found</h3>
        <p className="mt-2 text-[#5d6f64] dark:text-[#b7c8bd]">
          Try changing the search or filters, or add your first study room.
        </p>
      </div>
    )
  }

  return (
    <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
  )
}

export default RoomGrid
