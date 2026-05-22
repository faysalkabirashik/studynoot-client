import { createContext, useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { auth, hasFirebaseConfig } from '../firebase/firebase.config'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const loadUser = async () => {
    try {
      const { data } = await api.get('/api/auth/me')
      setUser(data)
    } catch {
      setUser(null)
    } finally {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  const registerUser = async (formData) => {
    await api.post('/api/auth/register', formData)
  }

  const loginUser = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password })
    setUser(data.user)
  }

  const loginWithGoogle = async () => {
    if (!hasFirebaseConfig || !auth) {
      toast.error('Google login needs Firebase environment variables')
      return null
    }

    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const profile = result.user
    const { data } = await api.post('/api/auth/google', {
      name: profile.displayName,
      email: profile.email,
      photo: profile.photoURL,
    })
    setUser(data.user)
    return data.user
  }

  const logoutUser = async () => {
    await api.post('/api/auth/logout')
    setUser(null)
  }

  const value = {
    user,
    authLoading,
    registerUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
    loadUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
