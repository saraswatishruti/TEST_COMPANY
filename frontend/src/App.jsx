import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import DebugPanel from './components/DebugPanel'
import TokenSwitcher from './components/TokenSwitcher'

import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Customer/Dashboard'
import AccountDetails from './pages/Customer/AccountDetails'
import Beneficiaries from './pages/Beneficiaries'
import Transactions from './pages/Transactions'
import TransactionView from './pages/TransactionView'
import CustomerSearch from './pages/Employee/CustomerSearch'
import AdminUsers from './pages/Admin/Users'
import KYCUpload from './pages/Admin/KYCUpload'
import ManagerRequests from './pages/Manager/Requests'
import DebugPage from './pages/DebugPage'

export default function App(){
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/accounts/:id" element={<AccountDetails/>} />
            <Route path="/accounts" element={<Dashboard/>} />
            <Route path="/beneficiaries" element={<Beneficiaries/>} />
            <Route path="/transactions" element={<Transactions/>} />
            <Route path="/transactions/:id" element={<TransactionView/>} />
            <Route path="/employee/customers" element={<CustomerSearch/>} />
            <Route path="/admin/users" element={<AdminUsers/>} />
            <Route path="/admin/upload-kyc" element={<KYCUpload/>} />
            <Route path="/manager/requests" element={<ManagerRequests/>} />
            <Route path="/debug" element={<DebugPage/>} />
          </Routes>
        </main>
      </div>
      <DebugPanel />
    </div>
  )
}
