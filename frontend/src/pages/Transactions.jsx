import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { emitDebug } from '../components/debugEmit'
import { useNavigate } from 'react-router-dom'
import { Card, Spinner } from '../components/UiElements'
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react'

export default function Transactions(){
  const [form, setForm] = useState({amount:'', toAccount:'', remarks:''})
  const [history, setHistory] = useState(null)
  const [resp, setResp] = useState(null)
  const [viewId, setViewId] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{ fetchHistory() },[])

  async function fetchHistory(){
    setLoading(true)
    try{ const r = await api.get('/api/transactions'); setHistory(r.data); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error: err.message}; setResp(d); emitDebug(err.response || {error: err.message}) } finally { setLoading(false) }
  }

  async function submit(e){
    e.preventDefault()
    try{ const r = await api.post('/api/transactions', form); setResp(r.data); emitDebug(r); fetchHistory(); }catch(err){ const d = err.response? err.response.data:{error: err.message}; setResp(d); emitDebug(err.response || {error: err.message}) }
  }

  const view = (e)=>{ e.preventDefault(); if(!viewId) return alert('enter id'); navigate(`/transactions/${viewId}`) }

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-3">Transactions</h3>

      <Card className="mb-4">
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <input className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} placeholder="Amount" />
          </div>
          <div>
            <label className="text-sm text-gray-600">To Account</label>
            <input className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" value={form.toAccount} onChange={e=>setForm({...form,toAccount:e.target.value})} placeholder="To Account" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Remarks (sent raw)</label>
            <textarea className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" value={form.remarks} onChange={e=>setForm({...form,remarks:e.target.value})} placeholder="Remarks (will be sent raw)"></textarea>
          </div>
          <div className="flex justify-end">
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Send</button>
          </div>
        </form>
      </Card>

      <form onSubmit={view} className="flex gap-2 mb-4">
        <input className="border rounded-lg px-3 py-2" value={viewId} onChange={e=>setViewId(e.target.value)} placeholder="Transaction ID" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">View Transaction</button>
      </form>

      <div>
        <h4 className="font-semibold mb-2">History</h4>
        {loading ? <div className="py-6 flex justify-center"><Spinner /></div> : null}

        {history && history.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No transactions yet</div>
        ) : null}

        {history ? (
          <div className="space-y-3">
            {history.map(t=> (
              <Card key={t.id} className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gray-50">
                    {Number(t.amount) >= 0 ? <ArrowDownCircle className="text-emerald-600" /> : <ArrowUpCircle className="text-red-500" />}
                  </div>
                  <div>
                    <div className="font-medium">{t.amount}</div>
                    <div className="text-sm text-gray-500">To: {t.toAccount}</div>
                    <div className="text-xs text-gray-400 mt-1">{t.timestamp || t.createdAt}</div>
                  </div>
                </div>

                <div className="max-w-md ml-4">
                  <div className="text-sm text-gray-600">Remarks</div>
                  <div className="mt-1 p-2 bg-gray-50 border rounded" dangerouslySetInnerHTML={{__html: t.remarks || ''}} />
                </div>
              </Card>
            ))}
          </div>
        ) : <div className="text-sm text-gray-500">No history or loading...</div>}
      </div>

      <div className="mt-6">
        <h4 className="font-semibold">Last API response</h4>
        <pre className="text-xs bg-gray-50 border rounded p-2 mt-2">{JSON.stringify(resp, null, 2)}</pre>
      </div>
    </div>
  )
}
