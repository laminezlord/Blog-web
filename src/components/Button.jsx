export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  type = 'button', 
  disabled = false 
}) {
  const baseStyles = "font-medium transition-all-soft rounded-lg inline-flex items-center justify-center gap-2"
  
  const variants = {
    primary: "bg-gold-200 text-dark-100 hover:bg-gold-300 shadow-soft hover:shadow-glow",
    secondary: "bg-cream-200 text-brown-100 hover:bg-cream-300 border border-cream-400",
    outline: "border-2 border-gold-200 text-gold-200 hover:bg-gold-200 hover:text-dark-100",
    ghost: "text-brown-100 hover:bg-cream-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
    dark: "bg-dark-100 text-cream-100 hover:bg-dark-200"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3 text-lg"
  }

  const darkVariants = {
    primary: "dark:bg-gold-200 dark:text-dark-100",
    secondary: "dark:bg-dark-200 dark:text-cream-100 dark:border-dark-100 dark:hover:bg-dark-100",
    outline: "dark:border-gold-200 dark:text-gold-200 dark:hover:bg-gold-200 dark:hover:text-dark-100",
    ghost: "dark:text-cream-100 dark:hover:bg-dark-200",
    danger: "dark:bg-red-600",
    dark: "dark:bg-cream-100 dark:text-dark-100 dark:hover:bg-cream-200"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${darkVariants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}