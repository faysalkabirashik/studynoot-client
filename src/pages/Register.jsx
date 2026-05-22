import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import useTitle from '../hooks/useTitle'

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', photo: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { registerUser, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  useTitle('Register')

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters'
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter'
    }
    return ''
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    const passwordError = validatePassword(formData.password)

    if (passwordError) {
      setError(passwordError)
      return
    }

    setError('')
    setLoading(true)

    try {
      await registerUser(formData)
      toast.success('Registration successful! Please login.')
      navigate('/login')
    } catch (serverError) {
      toast.error(serverError.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      const user = await loginWithGoogle()
      if (user) {
        toast.success('Google registration successful')
        navigate('/')
      }
    } catch {
      toast.error('Google registration failed')
    }
  }

  return (
    <section className="container-pad grid min-h-[calc(100vh-220px)] items-center py-14">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[32px] bg-white/80 p-6 shadow-[0_40px_120px_-50px_rgba(59,130,246,0.45)] ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#60a5fa] p-10 text-white shadow-lg shadow-sky-500/20">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/90">
              Welcome to StudyNook</span>
            <h1 className="mt-8 text-4xl font-black leading-tight">Secure your next quiet study session.</h1>
            <p className="mt-5 text-base leading-8 text-white/85">
              Join a smarter booking experience and manage your study space with a polished, user-first design.</p>
            <div className="mt-8 space-y-4 text-white/90">
              <div className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                <span className="font-semibold">Create an account quickly with email and password.</span>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                <span className="font-semibold">Upload profile details later in your profile settings.</span>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                <span className="font-semibold">Book rooms, list spaces, and manage bookings in one place.</span>
              </div>
            </div>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-10 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.18)] dark:bg-[#111827]">
            <h1 className="text-3xl font-black">Create Your Account</h1>
            <p className="section-text mt-2">Register to list rooms and book study slots. Upload your profile photo later from your account settings.</p>

            <form onSubmit={handleRegister} className="mt-7 grid gap-5">
              <div className="grid gap-2">
                <label className="font-bold">Name</label>
                <input className="form-field" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Email</label>
                <input className="form-field" type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Photo URL (optional)</label>
                <input className="form-field" type="url" name="photo" value={formData.photo} onChange={handleChange} placeholder="https://example.com/avatar.jpg" />
              </div>
              <div className="grid gap-2">
                <label className="font-bold">Password</label>
                <input className="form-field" type="password" name="password" value={formData.password} onChange={handleChange} required />
                {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
              </div>
              <button type="submit" className="primary-btn w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <button type="button" onClick={handleGoogle} className="secondary-btn mt-4 w-full">
              <span className="font-black">G</span> Continue with Google
            </button>

            <p className="mt-6 text-center text-[#5d6f64] dark:text-[#b7c8bd]">
              Already have an account? <Link to="/login" className="font-black text-[#1f7a4c]">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
