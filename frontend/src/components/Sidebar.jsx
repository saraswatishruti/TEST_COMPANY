import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  ['Dashboard','/accounts'],
  ['Register','/register'],
  ['Login','/login'],
  ['Beneficiaries','/beneficiaries'],
  ['Transactions','/transactions'],
  ['Employee: Customers','/employee/customers'],
  ['Admin: Users','/admin/users'],
  ['Admin: KYC Upload','/admin/upload-kyc'],
  ['Manager: Requests','/manager/requests'],
  ['Debug','/debug'],
]

export default function Sidebar(){
  return (
    <aside className="w-64 bg-white border-r h-screen p-4 sticky top-0">
      <h2 className="font-bold mb-4 text-lg">Banking Frontend</h2>
      <nav className="flex flex-col gap-2">
        {links.map(([label, to])=> (
          <NavLink key={to} to={to} className={({isActive})=> `px-3 py-2 rounded ${isActive? 'bg-blue-100':'hover:bg-gray-100'}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
