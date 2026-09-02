import React from 'react'
import TokenSwitcher from './TokenSwitcher'

export default function Navbar(){
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <div className="font-semibold">Banking App</div>
      <div className="flex items-center gap-4">
        <TokenSwitcher />
      </div>
    </header>
  )
}
