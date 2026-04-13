import { X } from 'lucide-react'
import { Button } from './Button'

export function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 modal-backdrop" onClick={onClose}></div>
      <div className="relative bg-cream-100 dark:bg-dark-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-in">
        <div className="p-6 border-b border-cream-300 dark:border-dark-100 flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold text-brown-100 dark:text-cream-100">{title}</h3>
          <button onClick={onClose} className="text-brown-50 dark:text-cream-400 hover:text-gold-200 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {footer && (
          <div className="p-6 border-t border-cream-300 dark:border-dark-100 bg-cream-50 dark:bg-dark-100 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}