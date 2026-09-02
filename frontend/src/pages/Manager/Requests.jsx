import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'

export default function ManagerRequests(){
  const [list, setList] = useState(null)
  const [resp, setResp] = useState(null)

  useEffect(()=>{ fetchList() },[])

  async function fetchList(){ try{ const r = await api.get('/api/manager/requests'); setList(r.data); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) } }

  async function approve(id){ try{ const r = await api.put(`/api/manager/requests/${id}/approve`); setResp(r.data); emitDebug(r); fetchList(); }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) } }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Manager: Requests</h3>
      <div className="space-y-2">
        {list ? list.map(req=> (
          <div key={req.id} className="p-2 bg-white border rounded flex justify-between items-center">
            <div><pre className="text-xs">{JSON.stringify(req, null, 2)}</pre></div>
            <div>
              <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={()=>approve(req.id)}>Approve</button>
            </div>
          </div>
        )) : <div className="text-sm text-gray-500">No requests or loading...</div>}
      </div>

      <div className="mt-4"><h4 className="font-semibold">Last API response</h4><pre className="text-xs">{JSON.stringify(resp, null, 2)}</pre></div>
    </div>
  )
}
