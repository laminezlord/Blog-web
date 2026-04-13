import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-cream-100 dark:bg-dark-200 border-t border-cream-300 dark:border-dark-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-brown-50 dark:text-cream-400 text-sm">
            © 2026 Laminez Blog. Crafted with elegance.
          </p>
        </div>
      </footer>
    </div>
  )
}