import { Zap, Circle } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }
  
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        {/* Background circle */}
        <Circle className={`${sizeClasses[size]} text-primary-200 fill-current`} />
        {/* Lightning bolt icon */}
        <Zap className={`absolute inset-0 ${sizeClasses[size]} text-primary-600 p-1.5`} />
      </div>
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizes[size]}`}>
          NextLanding
        </span>
      )}
    </div>
  )
}