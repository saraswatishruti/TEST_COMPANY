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
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">CyberBank</Link>
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
