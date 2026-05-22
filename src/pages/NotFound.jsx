import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import useTitle from '../hooks/useTitle'

const NotFound = () => {
  useTitle('Page Not Found')

  return (
    <section className="container-pad grid min-h-[calc(100vh-220px)] place-items-center py-20 text-center">
      <div className="max-w-xl">
        <p className="text-8xl font-black text-[#1f7a4c]">404</p>
        <h1 className="mt-4 text-4xl font-black">Page not found</h1>
        <p className="section-text mt-4">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/" className="primary-btn mt-8">
          <Home size={18} /> Back to Home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
