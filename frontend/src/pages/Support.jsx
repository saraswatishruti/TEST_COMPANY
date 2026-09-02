import React, { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Support(){
  const [tickets, setTickets] = useState([])
  const [form, setForm] = useState({subject:'', message:''})

  useEffect(()=> fetchTickets(), [])

  async function fetchTickets(){
    try{ const res = await api.get('/support'); setTickets(res.data || []) }catch(e){}
  }

  async function submit(e){
    e.preventDefault()
    try{ await api.post('/support', form); setForm({subject:'', message:''}); fetchTickets() }catch(e){ alert('Failed') }
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>Submit Ticket (Stored XSS target)</h3>
        <form onSubmit={submit} className="form">
          <input placeholder="Subject" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} required />
          <textarea placeholder="Message (HTML/JS allowed)" value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} required />
          <button>Submit</button>
        </form>
      </div>

      <div className="card">
        <h3>All Tickets (rendered unsafely)</h3>
        {tickets.map(t=> (
          <div key={t._id} className="ticket">
            <h4>{t.subject}</h4>
            <div className="message" dangerouslySetInnerHTML={{__html: t.message || ''}} />
            <pre>{JSON.stringify(t, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}
