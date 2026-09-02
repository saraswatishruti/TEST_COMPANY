import React from 'react'

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white border rounded-2xl p-4 shadow-sm ${className}`}>{children}</div>
)

export const Spinner = ({ size = 6, className = '' }) => (
  <div className={`animate-spin inline-block ${className}`}>
    <svg className={`w-${size} h-${size} text-indigo-600`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  </div>
)

// Simple Toast banner (presentational). parent components can control show/message.
export const Toast = ({ type = 'info', message }) => {
  if(!message) return null
  const colors = {
    info: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    warn: 'bg-amber-50 border-amber-200 text-amber-700'
  }
  return (
    <div className={`border rounded-xl p-3 ${colors[type] || colors.info}`}>
      <div className="text-sm">{message}</div>
    </div>
  )
}
