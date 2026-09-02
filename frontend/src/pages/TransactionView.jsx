import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { emitDebug } from '../components/debugEmit'
import { Card } from '../components/UiElements'

export default function TransactionView(){
  const { id } = useParams()
  const [txId, setTxId] = useState(id || '')
  const [resp, setResp] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{ if(id) fetch(id) },[id])

  const fetch = async (tId)=>{
    try{ const r = await api.get(`/api/transactions/${tId}`); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response || {error: err.message}) }
  }

  const go = (e)=>{ e.preventDefault(); if(!txId) return alert('enter id'); navigate(`/transactions/${txId}`) }

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-3">View Transaction</h3>
      <form onSubmit={go} className="flex gap-2 mb-4">
        <input className="border rounded-lg px-3 py-2" value={txId} onChange={e=>setTxId(e.target.value)} placeholder="Transaction ID" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Fetch</button>
      </form>

      <Card>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-auto">
          <pre>{JSON.stringify(resp, null, 2)}</pre>
        </div>
      </Card>
    </div>
  )
}
