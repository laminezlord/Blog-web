import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Type } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { TextArea } from '../components/TextArea'
import { Select } from '../components/Select'

const categories = [
  { value: 'Tech', label: 'Technology' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Food', label: 'Food & Dining' },
  { value: 'Art', label: 'Art & Design' },
  { value: 'Business', label: 'Business' }
]

export function CreatePostPage() {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Tech')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useLocalStorage('posts', [])
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPost = {
      id: Date.now(),
      author: user.username,
      title,
      category,
      date: new Date().toISOString().split('T')[0],
      content
    }

    setPosts([...posts, newPost])
    navigate('/dashboard')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-fade-in">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-brown-50 dark:text-cream-400 hover:text-gold-200 transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brown-100 dark:text-cream-100">
          Create New Post
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-cream-50 dark:bg-dark-200 rounded-3xl shadow-soft p-8 border border-cream-200 dark:border-dark-100 animate-fade-in">
        <div className="space-y-6">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter an engaging title..."
            required
            icon={Type}
          />
          
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categories}
            required
          />
          
          <TextArea
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story here..."
            required
            rows={12}
          />
          
          <div className="flex gap-4 pt-4">
            <Button type="submit" size="lg" className="flex-1">
              <Check size={20} />
              Publish Post
            </Button>
            <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}