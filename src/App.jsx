import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import Spinner from './components/Spinner'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import AddRoom from './pages/AddRoom'
import MyListings from './pages/MyListings'
import MyBookings from './pages/MyBookings'
import NotFound from './pages/NotFound'

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return <Spinner label="Checking login status..." />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/:id" element={<RoomDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="add-room" element={<PrivateRoute><AddRoom /></PrivateRoute>} />
        <Route path="my-listings" element={<PrivateRoute><MyListings /></PrivateRoute>} />
        <Route path="my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
