import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar(){
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }
  const role = localStorage.getItem('role') || 'guest'
  return (
    <nav className=\"nav\">\n      <div className=\"nav-left\">\n        <Link to=\"/\" className=\"flex items-center gap-3\">\n          <div className=\"w-9 h-9 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-500 flex items-center justify-center text-white font-bold\">BF</div>\n          <div>\n            <div className=\"text-lg font-semibold\">CyberBank</div>\n            <div className=\"text-xs text-gray-500\">Developer playground</div>\n          </div>\n        </Link>\n
      </div>
      <div className="nav-right">
        <Link to="/customer">Customer</Link>
        <Link to="/beneficiaries">Beneficiaries</Link>
        <Link to="/support">Support</Link>
        <Link to="/kyc">KYC</Link>
        <Link to="/employee">Employee</Link>
        <Link to="/manager">Manager</Link>
        <Link to="/admin">Admin</Link>
        <span className="role">role: {role}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}
