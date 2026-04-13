import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Calendar } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Button } from '../components/Button'

const categories = {
  'Tech': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Lifestyle': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Travel': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Food': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'Art': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Business': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
}

export function PostDetailPage() {
  const { id } = useParams()
  const [posts] = useLocalStorage('posts', [])
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const found = posts.find(p => p.id === parseInt(id))
    if (found) {
      setPost(found)
    } else {
      setNotFound(true)
    }
  }, [id, posts])

  if (notFound) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-brown-100 dark:text-cream-100 mb-4">Post Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Feed</Button>
        </div>
      </div>
    )
  }

  if (!post) return null

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-brown-50 dark:text-cream-400 hover:text-gold-200 transition-colors mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>
      
      <div className="bg-cream-50 dark:bg-dark-200 rounded-3xl shadow-soft overflow-hidden border border-cream-200 dark:border-dark-100">
        <div className="h-64 md:h-80 bg-gradient-to-br from-cream-200 to-cream-300 dark:from-dark-100 dark:to-dark-200 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%235C4033\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          <span className="text-8xl font-serif text-brown-100/20 dark:text-cream-100/10 font-bold select-none">
            {post.title.charAt(0).toUpperCase()}
          </span>
          <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-sm font-semibold ${categories[post.category] || categories['Tech']}`}>
            {post.category}
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6 text-sm text-brown-50 dark:text-cream-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gold-200 rounded-full flex items-center justify-center text-dark-100 font-bold text-xs">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-brown-100 dark:text-cream-100 mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-p:text-brown-50 dark:prose-p:text-cream-400 prose-headings:text-brown-100 dark:prose-headings:text-cream-100">
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 leading-relaxed text-brown-50 dark:text-cream-400 text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}