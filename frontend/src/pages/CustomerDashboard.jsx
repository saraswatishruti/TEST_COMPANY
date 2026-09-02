import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function CustomerDashboard(){
  const [accounts, setAccounts] = useState([])
  const [newAcctName, setNewAcctName] = useState('')
  const [transfer, setTransfer] = useState({from:'', to:'', amount:0, remarks:''})
  const [msg, setMsg] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{ fetchAccounts() }, [])

  async function fetchAccounts(){
    try{
      const res = await api.get('/accounts')
      setAccounts(res.data || [])
    }catch(e){ setMsg('Failed to fetch accounts') }
  }

  async function createAccount(e){
    e.preventDefault()
    try{
      await api.post('/accounts', { name: newAcctName })
      setNewAcctName('')
      fetchAccounts()
    }catch(e){ setMsg('Failed to create') }
  }

  async function makeTransfer(e){
    e.preventDefault()
    try{
      await api.post('/transactions', transfer)
      setMsg('Transaction created')
    }catch(err){ setMsg('Transfer failed') }
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>Your Accounts</h3>
        <ul>
          {accounts.map(a=> (
            <li key={a._id}>{a.name} — <button onClick={()=>navigate(`/accounts/${a._id}`)}>View</button></li>
          ))}
        </ul>

        <form onSubmit={createAccount} className="form">
          <input placeholder="New account name" value={newAcctName} onChange={e=>setNewAcctName(e.target.value)} required/>
          <button>Create Account</button>
        </form>
      </div>

      <div className="card">
        <h3>Make Transfer</h3>
        <form onSubmit={makeTransfer} className="form">
          <input placeholder="From account ID" value={transfer.from} onChange={e=>setTransfer(t=>({...t,from:e.target.value}))} required />
          <input placeholder="To account ID" value={transfer.to} onChange={e=>setTransfer(t=>({...t,to:e.target.value}))} required />
          <input placeholder="Amount" type="number" value={transfer.amount} onChange={e=>setTransfer(t=>({...t,amount:parseFloat(e.target.value)}))} required />
          <textarea placeholder="Remarks (stored XSS target)" value={transfer.remarks} onChange={e=>setTransfer(t=>({...t,remarks:e.target.value}))} />
          <button>Send</button>
        </form>
        {msg && <div className="info">{msg}</div>}
      </div>
    </div>
  )
}
