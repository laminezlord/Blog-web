import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, FileText, Calendar, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Button } from '../components/Button'
import { PostCard } from '../components/PostCard'
import { Modal } from '../components/Modal'

export function DashboardPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useLocalStorage('posts', [])
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const navigate = useNavigate()

  const userPosts = posts.filter(post => post.author === user.username)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (postToDelete) {
      setPosts(posts.filter(p => p.id !== postToDelete))
      setDeleteModalOpen(false)
      setPostToDelete(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brown-100 dark:text-cream-100 mb-2">
            My Dashboard
          </h1>
          <p className="text-brown-50 dark:text-cream-400">
            Manage your stories and create new ones
          </p>
        </div>
        <Button onClick={() => navigate('/create')} size="lg">
          <Plus size={20} />
          New Post
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
        <div className="bg-cream-50 dark:bg-dark-200 rounded-2xl p-6 border border-cream-200 dark:border-dark-100 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold-200/20 rounded-xl flex items-center justify-center">
              <FileText className="text-gold-200" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-brown-100 dark:text-cream-100">{userPosts.length}</p>
              <p className="text-sm text-brown-50 dark:text-cream-400">Total Posts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-cream-50 dark:bg-dark-200 rounded-2xl p-6 border border-cream-200 dark:border-dark-100 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100/20 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <Calendar className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-brown-100 dark:text-cream-100">
                {userPosts.length > 0 ? new Date(userPosts[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
              </p>
              <p className="text-sm text-brown-50 dark:text-cream-400">Last Published</p>
            </div>
          </div>
        </div>
        
        <div className="bg-cream-50 dark:bg-dark-200 rounded-2xl p-6 border border-cream-200 dark:border-dark-100 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100/20 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-brown-100 dark:text-cream-100">
                {new Set(userPosts.map(p => p.category)).size}
              </p>
              <p className="text-sm text-brown-50 dark:text-cream-400">Categories</p>
            </div>
          </div>
        </div>
      </div>
      
      {userPosts.length === 0 ? (
        <div className="text-center py-16 bg-cream-50 dark:bg-dark-200 rounded-3xl border border-dashed border-cream-400 dark:border-dark-100 animate-fade-in">
          <div className="w-20 h-20 bg-cream-200 dark:bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl"></span>
          </div>
          <h3 className="text-xl font-serif font-bold text-brown-100 dark:text-cream-100 mb-2">No posts yet</h3>
          <p className="text-brown-50 dark:text-cream-400 mb-6">Start your writing journey by creating your first post</p>
          <Button onClick={() => navigate('/create')}>
            Create Your First Post
          </Button>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-serif font-bold text-brown-100 dark:text-cream-100 mb-4">Your Posts</h2>
          {userPosts.map((post, index) => (
            <div key={post.id} style={{animationDelay: `${index * 0.1}s`}} className="animate-slide-in">
              <PostCard post={post} onDelete={handleDeleteClick} showActions compact />
            </div>
          ))}
        </div>
      )}
      
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Post?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete</Button>
          </>
        }
      >
        <p className="text-brown-50 dark:text-cream-400">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
      </Modal>
    </div>
  )
}