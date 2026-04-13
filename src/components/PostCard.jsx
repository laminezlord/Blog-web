import { useNavigate } from 'react-router-dom'
import { ArrowRight, Edit2, Trash2, User, Calendar } from 'lucide-react'

const categories = {
  'Tech': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Lifestyle': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Travel': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Food': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'Art': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Business': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
}

export function PostCard({ post, onDelete, showActions = false, compact = false }) {
  const navigate = useNavigate()

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(post.id)
  }

  return (
    <article 
      onClick={() => navigate(`/posts/${post.id}`)}
      className={`group bg-cream-50 dark:bg-dark-200 rounded-2xl overflow-hidden shadow-soft hover-lift cursor-pointer border border-cream-200 dark:border-dark-100 ${compact ? 'flex flex-col md:flex-row' : ''}`}
    >
      <div className={`bg-gradient-to-br from-cream-200 to-cream-300 dark:from-dark-100 dark:to-dark-200 ${compact ? 'md:w-48 h-32 md:h-auto' : 'h-48'} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%235C4033\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <span className="text-4xl font-serif text-brown-100/30 dark:text-cream-100/20 font-bold select-none">
          {post.title.charAt(0).toUpperCase()}
        </span>
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categories[post.category] || categories['Tech']}`}>
          {post.category}
        </div>
      </div>
      
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 text-sm text-brown-50 dark:text-cream-400 mb-3">
          <User size={14} />
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <Calendar size={14} />
          <span>{post.date}</span>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-brown-100 dark:text-cream-100 mb-2 group-hover:text-gold-200 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-brown-50 dark:text-cream-400 line-clamp-2 mb-4 leading-relaxed">
          {post.content.substring(0, 120)}...
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-gold-200 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Read More <ArrowRight size={16} />
          </span>
          
          {showActions && (
            <div className="flex gap-2" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => navigate(`/edit/${post.id}`)}
                className="p-2 text-brown-50 dark:text-cream-400 hover:text-gold-200 hover:bg-cream-200 dark:hover:bg-dark-100 rounded-lg transition-all"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={handleDelete}
                className="p-2 text-brown-50 dark:text-cream-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}