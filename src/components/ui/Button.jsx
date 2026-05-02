export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const variants = {
    primary: 'shopsphere-button-primary',
    ghost: 'shopsphere-button-ghost',
    solid:
      'inline-flex items-center justify-center rounded-full bg-dark-800 px-6 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-dark-700',
  }

  return (
    <button type={type} className={`${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}