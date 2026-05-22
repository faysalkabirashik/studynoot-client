import { useEffect, useState } from 'react'
import { ArrowRight, BookOpen, CalendarCheck, Clock, Search, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import useTitle from '../hooks/useTitle'
import Spinner from '../components/Spinner'
import RoomGrid from '../components/RoomGrid'

const Home = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  useTitle('Home')

  useEffect(() => {
    const loadLatestRooms = async () => {
      try {
        const { data } = await api.get('/api/rooms/latest')
        setRooms(data)
      } catch {
        setRooms([])
      } finally {
        setLoading(false)
      }
    }

    loadLatestRooms()
  }, [])

  return (
    <>
      <section className="relative overflow-hidden bg-[#3b82f6] text-white">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-white/10"></div>
        <div className="absolute -left-20 bottom-16 h-40 w-40 rotate-45 bg-white/10"></div>
        <div className="container-pad grid min-h-[calc(100vh-80px)] items-center gap-12 py-16 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative z-10">
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.02em] md:text-7xl">
              Book focused study rooms without the desk hunt
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-50">
              Browse and book quiet, private study rooms in your library. List your own room and earn.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/rooms"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-white px-6 font-extrabold transition-all duration-200 hover:scale-105 hover:bg-slate-100"
                style={{ color: '#0f172a' }}
              >
                Explore Rooms <ArrowRight size={18} />
              </Link>
              <Link to="/add-room" className="inline-flex min-h-14 items-center justify-center rounded-md border-4 border-white bg-transparent px-6 font-extrabold text-white transition-all duration-200 hover:scale-105 hero-secondary-btn">
                List a Room
              </Link>
            </div>
          </div>

          <div className="relative z-10">
            <div className="rounded-lg bg-white p-6 text-[#111827]">
              <div className="flex items-center justify-between border-b-4 border-[#f3f4f6] pb-5">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-wider text-[#3b82f6]">Today&apos;s Room Board</p>
                  <h2 className="mt-1 text-3xl font-extrabold tracking-[-0.02em]">Library North Wing</h2>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#f59e0b] text-white">
                  <BookOpen size={30} />
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {[
                  ['08:00', 'Quiet Zone 302', 'Open', '#10b981'],
                  ['10:00', 'Media Lab 410', 'Booked', '#f59e0b'],
                  ['13:00', 'Archive Suite 2B', 'Open', '#10b981'],
                ].map((item) => (
                  <div key={item[0]} className="grid grid-cols-[72px_1fr_auto] items-center gap-4 rounded-md bg-[#f3f4f6] p-4">
                    <span className="font-extrabold text-[#3b82f6]">{item[0]}</span>
                    <span className="font-bold">{item[1]}</span>
                    <span className="rounded-md px-3 py-1 text-xs font-extrabold text-white" style={{ backgroundColor: item[3] }}>
                      {item[2]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-md bg-[#dbeafe] p-4">
                  <p className="text-3xl font-extrabold text-[#2563eb]">6</p>
                  <p className="text-xs font-bold uppercase tracking-wider">Latest</p>
                </div>
                <div className="rounded-md bg-[#d1fae5] p-4">
                  <p className="text-3xl font-extrabold text-[#059669]">20:00</p>
                  <p className="text-xs font-bold uppercase tracking-wider">Last Slot</p>
                </div>
                <div className="rounded-md bg-[#fef3c7] p-4">
                  <p className="text-3xl font-extrabold text-[#d97706]">$5</p>
                  <p className="text-xs font-bold uppercase tracking-wider">From</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 dark:bg-[#111827]">
        <div className="container-pad grid gap-6 md:grid-cols-4">
          {[
            ['120+', 'Rooms listed', '#10b981'],
            ['99%', 'Conflict checks', '#3b82f6'],
            ['08-20', 'Hourly slots', '#f59e0b'],
            ['3 min', 'Average booking', '#111827'],
          ].map((stat) => (
            <div key={stat[1]} className="rounded-lg bg-[#f3f4f6] p-6 text-center dark:bg-[#1f2937]">
              <p className="text-4xl font-extrabold tracking-[-0.02em]" style={{ color: stat[2] }}>{stat[0]}</p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-[#4b5563] dark:text-[#d1d5db]">{stat[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f3f4f6] py-20 dark:bg-[#111827]">
        <div className="container-pad">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 className="section-title">Available Study Rooms</h2>
            <p className="section-text mt-3 max-w-2xl">
              Latest rooms are loaded directly from MongoDB using sort and limit.
            </p>
          </div>
          <Link to="/rooms" className="secondary-btn">View All Rooms</Link>
        </div>

        {loading ? <Spinner label="Fetching latest rooms..." /> : <RoomGrid rooms={rooms} />}
        </div>
      </section>

      <section id="about" className="bg-[#111827] py-20 text-white">
        <div className="container-pad grid gap-8 lg:grid-cols-3">
          {[
            { icon: Search, title: 'Search by Need', text: 'Find rooms by name, floor, budget, and amenities before choosing a slot.' },
            { icon: CalendarCheck, title: 'Book with Confidence', text: 'The booking system checks existing reservations before confirming your time.' },
            { icon: ShieldCheck, title: 'Owner Protected', text: 'Only the room owner can update or delete their own listings.' },
          ].map((item) => (
            <div key={item.title} className="group rounded-lg bg-[#1f2937] p-7 transition-all duration-200 hover:scale-[1.02] hover:bg-[#243244]">
              <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-[#3b82f6] transition-transform duration-200 group-hover:scale-110">
                <item.icon size={30} />
              </span>
              <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
              <p className="mt-3 leading-7 text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-pad py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
          <div className="grid gap-4 rounded-lg bg-[#10b981] p-6 text-white">
            <div className="grid grid-cols-[64px_1fr] items-center gap-4 rounded-md bg-white p-4 text-[#111827]">
              <Users className="text-[#10b981]" size={36} />
              <div>
                <p className="font-extrabold">Student dashboard</p>
                <p className="text-sm text-[#4b5563]">Confirmed and cancelled bookings in one place.</p>
              </div>
            </div>
            <div className="grid grid-cols-[64px_1fr] items-center gap-4 rounded-md bg-white p-4 text-[#111827]">
              <Clock className="text-[#f59e0b]" size={36} />
              <div>
                <p className="font-extrabold">Hourly reservation slots</p>
                <p className="text-sm text-[#4b5563]">Start and end time stays simple for students.</p>
              </div>
            </div>
            <div className="grid grid-cols-[64px_1fr] items-center gap-4 rounded-md bg-white p-4 text-[#111827]">
              <ShieldCheck className="text-[#3b82f6]" size={36} />
              <div>
                <p className="font-extrabold">Secure owner controls</p>
                <p className="text-sm text-[#4b5563]">Room management stays tied to the creator.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="section-title">Built for Students and Library Teams</h2>
            <p className="section-text mt-5">
              StudyNook keeps room discovery simple for students and gives room owners a clean dashboard for listings and bookings.
            </p>
            <div className="mt-7 grid gap-4">
              <p className="rounded-lg bg-[#f3f4f6] p-4 font-bold dark:bg-[#1f2937]">Private routes stay available after reload.</p>
              <p className="rounded-lg bg-[#f3f4f6] p-4 font-bold dark:bg-[#1f2937]">Every success and error uses toast messages.</p>
              <p className="rounded-lg bg-[#f3f4f6] p-4 font-bold dark:bg-[#1f2937]">Cards keep equal height across desktop, tablet, and mobile.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
