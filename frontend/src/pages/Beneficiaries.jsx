import React, { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Beneficiaries(){
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [acct, setAcct] = useState('')

  useEffect(()=> fetchList(), [])

  async function fetchList(){
    try{ const res = await api.get('/beneficiaries'); setList(res.data || []) }catch(e){}
  }

  async function add(e){
    e.preventDefault()
    try{ await api.post('/beneficiaries', { name, account: acct }); setName(''); setAcct(''); fetchList() }catch(e){}
  }

  async function del(id){
    if(!confirm('Delete beneficiary '+id+' ?')) return
    try{ await api.delete(`/beneficiaries/${id}`); fetchList() }catch(e){ alert('Failed') }
  }

  return (
    <div className="card">
      <h3>Beneficiaries</h3>
      <ul>
        {list.map(b=> (
          <li key={b._id}>{b.name} — {b.account} — <button onClick={()=>del(b._id)}>Delete ({b._id})</button></li>
        ))}
      </ul>

      <form onSubmit={add} className="form">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Account ID" value={acct} onChange={e=>setAcct(e.target.value)} required />
        <button>Add Beneficiary</button>
      </form>
    </div>
  )
}
