import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import useTitle from '../hooks/useTitle'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { loginUser, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  useTitle('Login')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await loginUser(formData.email, formData.password)
      toast.success('Login successful')
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      const user = await loginWithGoogle()
      if (user) {
        toast.success('Google login successful')
        navigate(from, { replace: true })
      }
    } catch {
      toast.error('Google login failed')
    }
  }

  return (
    <section className="container-pad grid min-h-[calc(100vh-220px)] items-center py-14">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[32px] bg-white/80 p-6 shadow-[0_40px_120px_-50px_rgba(59,130,246,0.45)] ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#60a5fa] p-10 text-white shadow-lg shadow-sky-500/20">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/90">
              Welcome back</span>
            <h1 className="mt-8 text-4xl font-black leading-tight">Sign in and manage your bookings.</h1>
            <p className="mt-5 text-base leading-8 text-white/85">
              Access your saved listings, reservations, and account settings with a smooth login experience.</p>
            <div className="mt-8 space-y-4 text-white/90">
              <div className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                <span className="font-semibold">Secure login with email and password.</span>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                <span className="font-semibold">Continue with Google in one click.</span>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                <span className="font-semibold">Keep your study sessions organized.</span>
              </div>
            </div>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-10 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.18)] dark:bg-[#111827]">
            <h1 className="text-3xl font-black">Login to StudyNook</h1>
            <p className="section-text mt-2">Continue booking and managing quiet rooms.</p>

            <form onSubmit={handleLogin} className="mt-7 grid gap-5">
              <div className="grid gap-2">
                <label className="font-bold">Email</label>
                <input className="form-field" type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Password</label>
                <input className="form-field" type="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="primary-btn w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <button type="button" onClick={handleGoogle} className="secondary-btn mt-4 w-full">
              <span className="font-black">G</span> Continue with Google
            </button>

            <p className="mt-6 text-center text-[#5d6f64] dark:text-[#b7c8bd]">
              Don&apos;t have an account? <Link to="/register" className="font-black text-[#1f7a4c]">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
