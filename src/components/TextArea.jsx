export function TextArea({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  rows = 6 
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-brown-100 dark:text-cream-200">
          {label} {required && <span className="text-gold-200">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full bg-cream-50 dark:bg-dark-200 border-2 border-cream-300 dark:border-dark-100 rounded-lg px-4 py-3 text-brown-100 dark:text-cream-100 placeholder-brown-50/50 dark:placeholder-cream-400/50 input-focus transition-all-soft resize-none"
      />
    </div>
  )
}