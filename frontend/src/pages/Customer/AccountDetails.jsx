import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'

export default function AccountDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [accId, setAccId] = useState(id || '')
  const [resp, setResp] = useState(null)

  useEffect(()=>{
    if(id) fetchId(id)
  },[id])

  const fetchId = async (idToFetch)=>{
    try{
      const r = await api.get(`/api/accounts/${idToFetch}`)
      setResp(r.data)
      emitDebug(r)
    }catch(err){ const d = err.response ? err.response.data : {error: err.message}; setResp(d); emitDebug(err.response || {error: err.message}) }
  }

  const go = (e)=>{ e.preventDefault(); navigate(`/accounts/${accId}`) }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Account Details</h3>
      <form onSubmit={go} className="flex gap-2 mb-4">
        <input className="border px-2 py-1" value={accId} onChange={e=>setAccId(e.target.value)} placeholder="Account ID" />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">View</button>
      </form>

      <div className="bg-white p-4 border rounded">
        <pre className="text-xs">{JSON.stringify(resp, null, 2)}</pre>
      </div>
    </div>
  )
}
