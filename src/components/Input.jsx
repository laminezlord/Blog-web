import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  error = '', 
  icon: Icon 
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-brown-100 dark:text-cream-200">
          {label} {required && <span className="text-gold-200">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-50 dark:text-cream-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-cream-50 dark:bg-dark-200 border-2 border-cream-300 dark:border-dark-100 rounded-lg px-4 ${Icon ? 'pl-10' : ''} ${isPassword ? 'pr-10' : ''} py-3 text-brown-100 dark:text-cream-100 placeholder-brown-50/50 dark:placeholder-cream-400/50 input-focus transition-all-soft`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-50 dark:text-cream-400 hover:text-gold-200 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm animate-slide-in">{error}</p>}
    </div>
  )
}