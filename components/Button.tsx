import { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'operator' | 'equals'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseClasses = 'h-16 rounded-xl font-semibold text-lg transition-all duration-150 active:scale-95'
  
  const variantClasses = {
    primary: 'bg-white hover:bg-gray-100 text-gray-900 shadow-sm',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    operator: 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md',
    equals: 'bg-green-500 hover:bg-green-600 text-white shadow-md',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}