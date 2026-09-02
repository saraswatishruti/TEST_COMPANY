import React from 'react'
import TokenSwitcher from './TokenSwitcher'

export default function Navbar(){
  return (
    <header className="bg-transparent p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border rounded-2xl p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 flex items-center justify-center text-white font-bold">BF</div>
            <div>
              <div className="text-lg font-semibold">Banking App</div>
              <div className="text-xs text-gray-500">Developer playground</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <TokenSwitcher />
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-sm font-medium">Test User</div>
                <div className="text-xs text-gray-400">dev@local</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-100 border flex items-center justify-center text-sm text-gray-600">TU</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
