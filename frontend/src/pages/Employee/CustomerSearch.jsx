import React, { useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'
import CollapsibleJSON from '../../components/CollapsibleJSON'
import { Card, Toast, Spinner } from '../../components/UiElements'

export default function CustomerSearch(){
  const [query, setQuery] = useState('')
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      // pass raw query string directly
      const r = await api.get('/api/employee/customers' + (query ? `?${query}` : ''))
      setResp(r.data)
      emitDebug(r)
      setNotice({ type: 'success', message: 'Search complete' })
    }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}); setNotice({ type: 'error', message: d.error || 'Search failed' }) } finally { setLoading(false) }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-3">Employee: Customer Search</h3>

      <Card className="mb-4">
        <form onSubmit={submit} className="space-y-3">
          <div className="text-sm text-gray-600">Enter raw query string (e.g. page=1&limit=20&name=Bob)</div>
          <input className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" value={query} onChange={e=>setQuery(e.target.value)} placeholder="raw query string" />
          <div className="flex justify-end">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Search</button>
          </div>
        </form>
      </Card>

      {notice && <div className="mb-4"><Toast type={notice.type} message={notice.message} /></div>}

      <div>
        <h4 className="font-semibold mb-2">Results</h4>
        {loading ? <div className="py-6 flex justify-center"><Spinner /></div> : null}

        {resp && Array.isArray(resp) && resp.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No customers found</div>
        ) : null}

        {resp && Array.isArray(resp) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resp.map(c=> (
              <Card key={c.id}>
                <div className="font-medium">{c.name || c.email || ('Customer ' + c.id)}</div>
                <div className="text-sm text-gray-500">{c.email}</div>
                <div className="text-xs text-gray-400 mt-2">ID: {c.id}</div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded p-3"><CollapsibleJSON data={resp} /></div>
        )}
      </div>
    </div>
  )
}
