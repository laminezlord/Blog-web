import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, LogOut, Plus, PenTool } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Button } from './Button'

export function Navbar() {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-40 glass border-b border-cream-300 dark:border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gold-200 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all">
              <PenTool className="text-dark-100" size={20} />
            </div>
            <span className="text-2xl font-serif font-bold gradient-text">Laminez Blog</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink 
              to="/" 
              className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-gold-200' : 'text-brown-100 dark:text-cream-100 hover:text-gold-200'}`}
            >
              Feed
            </NavLink>
            {user && (
              <NavLink 
                to="/dashboard" 
                className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-gold-200' : 'text-brown-100 dark:text-cream-100 hover:text-gold-200'}`}
              >
                My Dashboard
              </NavLink>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-brown-100 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-dark-200 transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-brown-50 dark:text-cream-400">Hello, {user.username}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          <button 
            className="md:hidden p-2 text-brown-100 dark:text-cream-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cream-100 dark:bg-dark-200 border-t border-cream-300 dark:border-dark-100 animate-slide-in">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-brown-100 dark:text-cream-100">Feed</Link>
            {user && <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block py-2 text-brown-100 dark:text-cream-100">My Dashboard</Link>}
            <hr className="border-cream-300 dark:border-dark-100" />
            {user ? (
              <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                Logout
              </Button>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}