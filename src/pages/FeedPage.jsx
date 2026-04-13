import { useState } from 'react'
import { Search } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { PostCard } from '../components/PostCard'

const categories = ['All', 'Tech', 'Lifestyle', 'Travel', 'Food', 'Art', 'Business']

export function FeedPage() {
  const [posts] = useLocalStorage('posts', [])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-4">
          Discover Stories
        </h1>
        <p className="text-lg text-brown-50 dark:text-cream-400 max-w-2xl mx-auto">
          Explore thoughts, ideas, and experiences from our community of writers
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-50 dark:text-cream-400" size={20} />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-cream-50 dark:bg-dark-200 border-2 border-cream-300 dark:border-dark-100 rounded-xl text-brown-100 dark:text-cream-100 placeholder-brown-50/50 dark:placeholder-cream-400/50 input-focus"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-gold-200 text-dark-100 shadow-soft' 
                  : 'bg-cream-200 dark:bg-dark-200 text-brown-100 dark:text-cream-100 hover:bg-cream-300 dark:hover:bg-dark-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-cream-200 dark:bg-dark-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl"></span>
          </div>
          <h3 className="text-xl font-serif font-bold text-brown-100 dark:text-cream-100 mb-2">No posts found</h3>
          <p className="text-brown-50 dark:text-cream-400">Try adjusting your search or category filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <div key={post.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}