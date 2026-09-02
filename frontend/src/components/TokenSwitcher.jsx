import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function TokenSwitcher(){
  const { rawSetToken } = useContext(AuthContext)
  const [value, setValue] = useState(localStorage.getItem('token') || '')

  const apply = ()=>{
    localStorage.setItem('token', value)
    rawSetToken(value)
    alert('Token set')
  }
  const clear = ()=>{
    localStorage.removeItem('token')
    rawSetToken(null)
    setValue('')
  }

  return (
    <div className="flex items-center gap-2">
      <input className="border px-2 py-1 rounded w-72" value={value} onChange={e=>setValue(e.target.value)} placeholder="Paste JWT token" />
      <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={apply}>Apply</button>
      <button className="bg-gray-200 px-3 py-1 rounded" onClick={clear}>Clear</button>
    </div>
  )
}
