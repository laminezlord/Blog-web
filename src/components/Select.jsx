export function Select({ 
  label, 
  value, 
  onChange, 
  options, 
  required = false 
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-brown-100 dark:text-cream-200">
          {label} {required && <span className="text-gold-200">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-cream-50 dark:bg-dark-200 border-2 border-cream-300 dark:border-dark-100 rounded-lg px-4 py-3 text-brown-100 dark:text-cream-100 input-focus transition-all-soft cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}