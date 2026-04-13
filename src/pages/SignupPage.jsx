import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, User, Mail, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function SignupPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}

    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.some(u => u.username === username)) {
      newErrors.username = 'Username already exists'
    }
    if (users.some(u => u.email === email)) {
      newErrors.email = 'Email already registered'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return

    const newUser = { username, email, password }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    login(newUser)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-cream-50 dark:bg-dark-200 rounded-3xl shadow-soft p-8 border border-cream-200 dark:border-dark-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
              <UserPlus className="text-dark-100" size={28} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-brown-100 dark:text-cream-100 mb-2">Join Cream Blog</h1>
            <p className="text-brown-50 dark:text-cream-400">Start sharing your stories today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Abiola"
              required
              error={errors.username}
              icon={User}
            />
            
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="laminezlord27@gmail.com"
              required
              error={errors.email}
              icon={Mail}
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              error={errors.password}
            />
            
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              error={errors.confirmPassword}
            />
            
            <Button type="submit" className="w-full mt-2" size="lg">
              Create Account
            </Button>
          </form>
          
          <p className="mt-6 text-center text-sm text-brown-50 dark:text-cream-400">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-200 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}