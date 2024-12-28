import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
            404
          </span>
        </h1>
        <p className="text-2xl font-semibold mt-4 mb-8">Oops! Page not found</p>
        <p className="text-lg text-gray-400 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

