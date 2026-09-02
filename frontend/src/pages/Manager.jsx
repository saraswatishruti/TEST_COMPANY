import React, { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Manager(){
  const [team, setTeam] = useState([])
  const [transactions, setTransactions] = useState([])
  const [reqId, setReqId] = useState('')

  useEffect(()=>{ load() }, [])

  async function load(){
    try{ const t = await api.get('/manager/team'); setTeam(t.data || []) }catch(e){}
    try{ const tx = await api.get('/manager/transactionsall'); setTransactions(tx.data || []) }catch(e){}
  }

  async function approve(){
    if(!reqId) return alert('enter id')
    try{ await api.put(`/manager/requests/${reqId}/approve`); alert('approved (or vulnerable)'); load() }catch(e){ alert('Approve failed') }
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>Team</h3>
        <pre>{JSON.stringify(team, null, 2)}</pre>
      </div>

      <div className="card">
        <h3>All Transactions</h3>
        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div>

      <div className="card">
        <h3>Approve Request (Privilege Escalation target)</h3>
        <input placeholder="request id" value={reqId} onChange={e=>setReqId(e.target.value)} />
        <button onClick={approve}>Approve</button>
      </div>
    </div>
  )
}
