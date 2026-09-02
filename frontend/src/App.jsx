import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import LoginRegister from './pages/LoginRegister'
import CustomerDashboard from './pages/CustomerDashboard'
import AccountDetails from './pages/AccountDetails'
import Beneficiaries from './pages/Beneficiaries'
import Support from './pages/Support'
import Employee from './pages/Employee'
import Manager from './pages/Manager'
import Admin from './pages/Admin'
import KYC from './pages/KYC'

function PrivateRoute({ children }){
  const token = localStorage.getItem('token')
  if(!token) return <Navigate to="/login" />
  return children
}

export default function App(){
  return (
    <div>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/customer" replace/>} />
          <Route path="/login" element={<LoginRegister/>} />

          <Route path="/customer" element={<PrivateRoute><CustomerDashboard/></PrivateRoute>} />
          <Route path="/accounts/:id" element={<PrivateRoute><AccountDetails/></PrivateRoute>} />
          <Route path="/beneficiaries" element={<PrivateRoute><Beneficiaries/></PrivateRoute>} />
          <Route path="/support" element={<PrivateRoute><Support/></PrivateRoute>} />

          <Route path="/employee" element={<PrivateRoute><Employee/></PrivateRoute>} />
          <Route path="/manager" element={<PrivateRoute><Manager/></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>} />
          <Route path="/kyc" element={<PrivateRoute><KYC/></PrivateRoute>} />

          <Route path="*" element={<div style={{padding:20}}>Not Found</div>} />
        </Routes>
      </main>
    </div>
  )
}
