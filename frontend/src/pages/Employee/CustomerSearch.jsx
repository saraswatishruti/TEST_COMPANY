import React, { useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'

export default function CustomerSearch(){
  const [query, setQuery] = useState('')
  const [resp, setResp] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    try{
      // pass raw query string directly
      const r = await api.get('/api/employee/customers' + (query ? `?${query}` : ''))
      setResp(r.data)
      emitDebug(r)
    }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Employee: Customer Search</h3>
      <form onSubmit={submit} className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Enter raw query string (e.g. page=1&limit=20&name=Bob)</div>
        <input className="w-full border px-2 py-1" value={query} onChange={e=>setQuery(e.target.value)} placeholder="raw query string" />
        <div className="mt-2">
          <button className="bg-blue-600 text-white px-3 py-1 rounded">Search</button>
        </div>
      </form>
      <div className="bg-white p-3 border rounded"><pre className="text-xs">{JSON.stringify(resp, null, 2)}</pre></div>
    </div>
  )
}
