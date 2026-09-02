import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { emitDebug } from '../components/debugEmit'

export default function TransactionView(){
  const { id } = useParams()
  const [txId, setTxId] = useState(id || '')
  const [resp, setResp] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{ if(id) fetch(id) },[id])

  const fetch = async (tId)=>{
    try{ const r = await api.get(`/api/transactions/${tId}`); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) }
  }

  const go = (e)=>{ e.preventDefault(); if(!txId) return alert('enter id'); navigate(`/transactions/${txId}`) }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">View Transaction</h3>
      <form onSubmit={go} className="flex gap-2 mb-4">
        <input className="border px-2 py-1" value={txId} onChange={e=>setTxId(e.target.value)} placeholder="Transaction ID" />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Fetch</button>
      </form>

      <div className="bg-white p-4 border rounded"><pre className="text-xs">{JSON.stringify(resp, null, 2)}</pre></div>
    </div>
  )
}
