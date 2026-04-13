import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { MainLayout } from './layouts/MainLayout.jsx'
import { ProtectedLayout } from './layouts/ProtectedLayout.jsx'
import { AuthLayout } from './layouts/AuthLayout.jsx'
import { FeedPage } from './pages/FeedPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { CreatePostPage } from './pages/CreatePostPage.jsx'
import { EditPostPage } from './pages/EditPostPage.jsx'
import { PostDetailPage } from './pages/PostDetailPage.jsx'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<FeedPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            
            {/* Auth Routes - Redirect if authenticated */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>
            
            {/* Protected Routes - Require authentication */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create" element={<CreatePostPage />} />
              <Route path="/edit/:id" element={<EditPostPage />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App