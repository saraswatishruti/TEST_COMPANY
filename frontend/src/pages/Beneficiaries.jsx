import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { emitDebug } from '../components/debugEmit'

export default function Beneficiaries(){
  const [list, setList] = useState(null)
  const [resp, setResp] = useState(null)
  const [name, setName] = useState('')
  const [idToDelete, setIdToDelete] = useState('')

  useEffect(()=>{ fetchList() },[])

  async function fetchList(){
    try{ const r = await api.get('/api/beneficiaries'); setList(r.data); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) }
  }

  async function add(e){ e.preventDefault(); try{ const r = await api.post('/api/beneficiaries', {name}); setResp(r.data); emitDebug(r); fetchList(); }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) } }

  async function del(e){ e.preventDefault(); if(!idToDelete) return alert('enter id'); try{ const r = await api.delete(`/api/beneficiaries/${idToDelete}`); setResp(r.data); emitDebug(r); fetchList(); }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) } }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Beneficiaries</h3>
      <form onSubmit={add} className="flex gap-2 mb-4">
        <input className="border px-2 py-1" value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
        <button className="bg-green-600 text-white px-3 py-1 rounded">Add</button>
      </form>

      <div className="mb-4">
        <h4 className="font-semibold">Delete by ID</h4>
        <form onSubmit={del} className="flex gap-2 mt-2">
          <input className="border px-2 py-1" value={idToDelete} onChange={e=>setIdToDelete(e.target.value)} placeholder="Beneficiary ID" />
          <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
        </form>
      </div>

      <div>
        <h4 className="font-semibold mb-2">List</h4>
        <pre className="text-xs bg-white border p-2 rounded">{JSON.stringify(list, null, 2)}</pre>
      </div>

      <div className="mt-4"><h4 className="font-semibold">Last API response</h4><pre className="text-xs">{JSON.stringify(resp, null, 2)}</pre></div>
    </div>
  )
}
