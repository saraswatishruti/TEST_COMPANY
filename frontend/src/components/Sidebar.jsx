import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, UserPlus, LogIn, Users, CreditCard, FileText, Briefcase, Settings, Terminal } from 'lucide-react'

const sections = [
  { label: '', items: [
      { label: 'Dashboard', to: '/accounts', icon: Home },
    ]},
  { label: 'Auth', items: [
      { label: 'Register', to: '/register', icon: UserPlus },
      { label: 'Login', to: '/login', icon: LogIn },
    ]},
  { label: 'Customer', items: [
      { label: 'Beneficiaries', to: '/beneficiaries', icon: Users },
      { label: 'Transactions', to: '/transactions', icon: CreditCard },
    ]},
  { label: 'Employee', items: [
      { label: 'Customers', to: '/employee/customers', icon: FileText },
    ]},
  { label: 'Admin', items: [
      { label: 'Users', to: '/admin/users', icon: Settings },
      { label: 'KYC Upload', to: '/admin/upload-kyc', icon: Briefcase },
    ]},
  { label: 'Manager', items: [
      { label: 'Requests', to: '/manager/requests', icon: Briefcase },
    ]},
  { label: 'Debug', items: [
      { label: 'Debug', to: '/debug', icon: Terminal },
    ]},
]

export default function Sidebar(){
  return (
    <aside className="w-72 bg-white border-r h-screen sticky top-0 p-4 flex flex-col gap-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 flex items-center justify-center text-white font-bold">BF</div>
        <div>
          <div className="text-lg font-semibold">Banking Frontend</div>
          <div className="text-xs text-gray-500">API test dashboard</div>
        </div>
      </div>

      <nav className="flex-1 overflow-auto">
        {sections.map((sec, idx)=> (
          <div key={idx} className="mb-4">
            {sec.label ? <div className="text-xs uppercase text-gray-400 font-semibold mb-2">{sec.label}</div> : null}
            <div className="flex flex-col gap-1">
              {sec.items.map(item=>{
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({isActive})=> `flex items-center gap-3 px-3 py-2 rounded-xl transition-colors text-sm ${isActive ? 'bg-indigo-600 text-white shadow' : 'text-gray-700 hover:bg-indigo-50'}`}>
                    <Icon size={16} className="opacity-90" />
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="text-xs text-gray-400">v1 • Test UI</div>
    </aside>
  )
}
