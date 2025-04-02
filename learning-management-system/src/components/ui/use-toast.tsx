"use client"

import * as React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Toast Types
export interface Toast {
  id?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success" | "warning";
  duration?: number;
}

export interface ToastActionElement {
  children: React.ReactNode;
  altText?: string;
}

export interface ToastOptions {
  variant?: "default" | "destructive" | "success" | "warning";
  duration?: number;
}

// Toast Context and Provider
interface ToastContextType {
  toasts: Toast[];
  toast: (props: Toast) => void;
  dismiss: (id?: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((props: Toast) => {
    const id = props.id || Math.random().toString(36).substring(2, 9)
    const newToast = { ...props, id }
    
    setToasts((currentToasts) => [...currentToasts, newToast])

    // Auto dismiss
    if (props.duration !== Infinity) {
      setTimeout(() => {
        dismiss(id)
      }, props.duration || 3000)
    }
  }, [])

  const dismiss = React.useCallback((id?: string) => {
    setToasts((currentToasts) => 
      id 
        ? currentToasts.filter((t) => t.id !== id)
        : currentToasts.slice(1)
    )
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

// Hook to use toast in components
export function useToast() {
  const context = React.useContext(ToastContext)
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  
  return context
}

// Toaster Component
export function Toaster() {
  const { toasts } = useToast()

  return (
    <div 
      className="fixed top-0 right-0 p-4 z-[100] space-y-3 w-full max-w-md"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} {...toast} />
      ))}
    </div>
  )
}

// Individual Toast Component
function ToastComponent({ 
  title, 
  description, 
  variant = 'default', 
  action 
}: Toast) {
  const { dismiss } = useToast()

  const variantStyles = {
    default: "bg-white text-black border",
    destructive: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black"
  }

  return (
    <div 
      className={cn(
        "p-4 rounded-lg shadow-lg flex items-start space-x-3",
        variantStyles[variant]
      )}
    >
      <div className="flex-1">
        <div className="font-bold">{title}</div>
        {description && (
          <div className="text-sm opacity-90">{description}</div>
        )}
      </div>
      {action && <div>{action}</div>}
      <button 
        onClick={() => dismiss()}
        className="ml-auto hover:opacity-75"
      >
        ×
      </button>
    </div>
  )
}

// Simplified toast function for direct use
export function toast(props: Toast) {
  const toastContext = React.useContext(ToastContext)
  
  if (!toastContext) {
    throw new Error('Toast used outside of ToastProvider')
  }
  
  return toastContext.toast(props)
}

// Example usage in a layout or page
export function ExampleUsage() {
  const { toast } = useToast()

  const handleShowToast = () => {
    toast({
      title: "Success",
      description: "Your action was completed successfully!",
      variant: "success"
    })
  }

  return (
    <button onClick={handleShowToast}>
      Show Toast
    </button>
  )
}