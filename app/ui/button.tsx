import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }

    const variantClasses = {
      default: "bg-[#4086F4] text-white hover:bg-[#4086F4]/90",
      ghost: "bg-transparent text-gray-700 hover:bg-[#4086F4]/10 border border-[#4086F4]",
    }

    return (
      <button
        ref={ref}
        className={cn(
          className,
          "rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4086F4]",
          sizeClasses[size],
          variantClasses[variant],
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

