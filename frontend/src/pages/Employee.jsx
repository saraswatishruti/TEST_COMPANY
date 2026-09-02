import React, { useState } from 'react'
import api from '../api/axios'

export default function Employee(){
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [id, setId] = useState('')
  const [item, setItem] = useState(null)

  async function search(e){
    e && e.preventDefault()
    // vulnerable: raw query param included
    try{
      const res = await api.get(`/employee/customers?search=${query}`)
      setResults(res.data || [])
    }catch(e){ alert('Search failed') }
  }

  async function lookup(){
    try{ const res = await api.get(`/employee/customers/${id}`); setItem(res.data) }catch(e){ alert('Lookup failed') }
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>Customer Search (NoSQL injection target)</h3>
        <form onSubmit={search} className="form">
          <input placeholder="raw search query" value={query} onChange={e=>setQuery(e.target.value)} />
          <button>Search</button>
        </form>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>

      <div className="card">
        <h3>Lookup Customer by ID (IDOR)</h3>
        <input placeholder="customer id" value={id} onChange={e=>setId(e.target.value)} />
        <button onClick={lookup}>Lookup</button>
        {item && <pre>{JSON.stringify(item, null, 2)}</pre>}
      </div>
    </div>
  )
}
