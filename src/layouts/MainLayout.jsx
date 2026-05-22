import { useState } from 'react'
import { BookOpenCheck, LogOut, Menu, Moon, Sun, X } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const navClass = ({ isActive }) =>
  `font-bold transition hover:text-[#3b82f6] ${isActive ? 'text-[#3b82f6]' : 'text-[#374151] dark:text-[#e5e7eb]'}`

const MainLayout = () => {
  const { user, logoutUser } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      toast.success('Logged out successfully')
      navigate('/')
    } catch {
      toast.error('Logout failed')
    }
  }

  const links = (
    <>
      <NavLink to="/" className={navClass}>Home</NavLink>
      <NavLink to="/rooms" className={navClass}>Rooms</NavLink>
      {user && <NavLink to="/add-room" className={navClass}>Add Room</NavLink>}
      {user && <NavLink to="/my-listings" className={navClass}>My Listings</NavLink>}
      {user && <NavLink to="/my-bookings" className={navClass}>My Bookings</NavLink>}
    </>
  )

  return (
    <div className="min-h-screen bg-white text-[#111827] dark:bg-[#111827] dark:text-[#f9fafb]">
      <header className="sticky top-0 z-40 border-b-4 border-[#f3f4f6] bg-white dark:border-[#1f2937] dark:bg-[#111827]">
        <nav className="container-pad flex min-h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tight">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#3b82f6] text-white">
              <BookOpenCheck size={25} />
            </span>
            StudyNook
          </Link>

          <div className="hidden items-center gap-7 lg:flex">{links}</div>

          <div className="hidden items-center gap-3 lg:flex">
            <button type="button" onClick={toggleTheme} className="secondary-btn px-3" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {!user && (
              <>
                <Link to="/login" className="secondary-btn">Login</Link>
                <Link to="/register" className="primary-btn">Register</Link>
              </>
            )}

            {user && (
              <div className="group relative">
                <button type="button" className="flex items-center gap-3 rounded-md bg-[#f3f4f6] px-3 py-2 dark:bg-[#1f2937]">
                  <img src={user.photo} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                  <span className="max-w-32 truncate font-bold">{user.name}</span>
                </button>
                <div className="invisible absolute right-0 top-14 w-52 rounded-md bg-[#f3f4f6] p-3 opacity-0 transition group-hover:visible group-hover:opacity-100 dark:bg-[#1f2937]">
                  <Link to="/my-listings" className="block rounded-md px-3 py-2 font-semibold hover:bg-white dark:hover:bg-[#374151]">My Listings</Link>
                  <Link to="/my-bookings" className="block rounded-md px-3 py-2 font-semibold hover:bg-white dark:hover:bg-[#374151]">My Bookings</Link>
                  <button type="button" onClick={handleLogout} className="mt-2 flex w-full items-center gap-2 rounded-md px-3 py-2 font-semibold text-red-600 hover:bg-white dark:hover:bg-[#374151]">
                    <LogOut size={17} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <button type="button" onClick={() => setOpen(!open)} className="secondary-btn px-3 lg:hidden" aria-label="Open menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {open && (
          <div className="container-pad grid gap-4 pb-5 lg:hidden">
            {links}
            <button type="button" onClick={toggleTheme} className="secondary-btn w-full">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            {!user ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Link to="/login" className="secondary-btn">Login</Link>
                <Link to="/register" className="primary-btn">Register</Link>
              </div>
            ) : (
              <button type="button" onClick={handleLogout} className="secondary-btn w-full text-red-600">
                <LogOut size={17} /> Logout
              </button>
            )}
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-20 bg-[#111827] py-10 text-white">
        <div className="container-pad grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3 text-2xl font-black">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#3b82f6] text-white">
                <BookOpenCheck size={22} />
              </span>
              StudyNook
            </Link>
            <p className="mt-4 max-w-md text-gray-300">
              Browse, list, and book quiet library study rooms with secure scheduling.
            </p>
          </div>

          <div>
            <h3 className="font-black">Useful Links</h3>
            <div className="mt-4 grid gap-2 text-gray-300">
              <Link to="/">Home</Link>
              <Link to="/rooms">Rooms</Link>
              <Link to="/#about">About</Link>
            </div>
          </div>

          <div>
            <h3 className="font-black">Contact</h3>
            <p className="mt-4 text-gray-300">hello@studynook.com</p>
            <p className="text-gray-300">+1 555 019 8890</p>
            <div className="mt-4 flex gap-3">
              <span className="secondary-btn h-10 w-10 px-0 font-black">f</span>
              <span className="secondary-btn h-10 w-10 px-0 text-lg font-black">X</span>
              <span className="secondary-btn h-10 w-10 px-0 font-black">in</span>
              <span className="secondary-btn h-10 w-10 px-0 font-black">IG</span>
            </div>
          </div>
        </div>
        <p className="container-pad mt-8 border-t-2 border-[#374151] pt-6 text-sm text-gray-300">
          Copyright {new Date().getFullYear()} StudyNook. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default MainLayout
