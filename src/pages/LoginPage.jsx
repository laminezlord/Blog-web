import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    if (user) {
      login(user)
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-cream-50 dark:bg-dark-200 rounded-3xl shadow-soft p-8 border border-cream-200 dark:border-dark-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
              <LogIn className="text-dark-100" size={28} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-brown-100 dark:text-cream-100 mb-2">Welcome Back</h1>
            <p className="text-brown-50 dark:text-cream-400">Sign in to continue your journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="laminezlord27@gmail.com"
              required
              icon={Mail}
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>
          
          <p className="mt-6 text-center text-sm text-brown-50 dark:text-cream-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-gold-200 hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}