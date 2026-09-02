import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { emitDebug } from '../components/debugEmit'
import { useNavigate } from 'react-router-dom'

export default function Transactions(){
  const [form, setForm] = useState({amount:'', toAccount:'', remarks:''})
  const [history, setHistory] = useState(null)
  const [resp, setResp] = useState(null)
  const [viewId, setViewId] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{ fetchHistory() },[])

  async function fetchHistory(){ try{ const r = await api.get('/api/transactions'); setHistory(r.data); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) } }

  async function submit(e){ e.preventDefault(); try{ const r = await api.post('/api/transactions', form); setResp(r.data); emitDebug(r); fetchHistory(); }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) } }

  const view = (e)=>{ e.preventDefault(); if(!viewId) return alert('enter id'); navigate(`/transactions/${viewId}`) }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Transactions</h3>
      <form onSubmit={submit} className="space-y-2 max-w-md mb-4">
        <input className="w-full border px-2 py-1" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} placeholder="Amount" />
        <input className="w-full border px-2 py-1" value={form.toAccount} onChange={e=>setForm({...form,toAccount:e.target.value})} placeholder="To Account" />
        <textarea className="w-full border px-2 py-1" value={form.remarks} onChange={e=>setForm({...form,remarks:e.target.value})} placeholder="Remarks (will be sent raw)"></textarea>
        <button className="bg-green-600 text-white px-3 py-1 rounded">Send</button>
      </form>

      <form onSubmit={view} className="flex gap-2 mb-4">
        <input className="border px-2 py-1" value={viewId} onChange={e=>setViewId(e.target.value)} placeholder="Transaction ID" />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">View Transaction</button>
      </form>

      <div>
        <h4 className="font-semibold mb-2">History</h4>
        {history ? (
          <ul className="space-y-2">
            {history.map(t=> (
              <li key={t.id} className="p-2 bg-white border rounded">
                <div>Amount: {t.amount}</div>
                <div>To: {t.toAccount}</div>
                <div className="mt-2">Remarks:</div>
                <div className="p-2 bg-gray-50 border mt-1" dangerouslySetInnerHTML={{__html: t.remarks || ''}} />
              </li>
            ))}
          </ul>
        ) : <div className="text-sm text-gray-500">No history or loading...</div>}
      </div>

      <div className="mt-4"><h4 className="font-semibold">Last API response</h4><pre className="text-xs">{JSON.stringify(resp, null, 2)}</pre></div>
    </div>
  )
}
