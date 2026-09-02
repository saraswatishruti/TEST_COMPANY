import React, { useState } from 'react'
import api from '../api/axios'
import { useParams } from 'react-router-dom'

export default function AccountDetails(){
  const { id } = useParams()
  const [acctId, setAcctId] = useState(id || '')
  const [account, setAccount] = useState(null)
  const [txId, setTxId] = useState('')
  const [transaction, setTransaction] = useState(null)
  const [msg, setMsg] = useState(null)

  async function loadAccount(e){
    e && e.preventDefault()
    setMsg(null)
    try{
      const res = await api.get(`/accounts/${acctId}`)
      setAccount(res.data)
    }catch(e){ setMsg('Account not found') }
  }

  async function loadTransaction(e){
    e && e.preventDefault()
    setMsg(null)
    try{
      const res = await api.get(`/transactions/${txId}`)
      setTransaction(res.data)
    }catch(e){ setMsg('Transaction not found') }
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>Lookup Account (IDOR target)</h3>
        <form onSubmit={loadAccount} className="form">
          <input placeholder="Account ID" value={acctId} onChange={e=>setAcctId(e.target.value)} required/>
          <button>Load Account</button>
        </form>
        {msg && <div className="error">{msg}</div>}
        {account && (
          <div>
            <h4>{account.name}</h4>
            <pre>{JSON.stringify(account, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Lookup Transaction (IDOR target)</h3>
        <form onSubmit={loadTransaction} className="form">
          <input placeholder="Transaction ID" value={txId} onChange={e=>setTxId(e.target.value)} required/>
          <button>Load Transaction</button>
        </form>
        {transaction && (
          <div>
            <h4>Transaction</h4>
            <div dangerouslySetInnerHTML={{__html: transaction.remarks || ''}} />
            <pre>{JSON.stringify(transaction, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
