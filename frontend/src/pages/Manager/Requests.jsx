import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'
import { Card } from '../../components/UiElements'
import CollapsibleJSON from '../../components/CollapsibleJSON'

export default function ManagerRequests(){
  const [list, setList] = useState(null)
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{ fetchList() },[])

  async function fetchList(){ setLoading(true); try{ const r = await api.get('/api/manager/requests'); setList(r.data); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) } finally { setLoading(false) } }

  async function approve(id){ try{ const r = await api.put(`/api/manager/requests/${id}/approve`); setResp(r.data); emitDebug(r); fetchList(); }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) } }

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-3">Manager: Requests</h3>
      <div className="space-y-3">
        {list ? list.map(req=> (
          <Card key={req.id} className="flex justify-between items-start">
            <div className="mr-4">
              <div className="font-medium">Request #{req.id}</div>
              <div className="text-sm text-gray-500">{req.summary || req.type}</div>
              <div className="text-xs text-gray-400 mt-2"><pre className="text-xs">{JSON.stringify(req, null, 2)}</pre></div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg" onClick={()=>approve(req.id)}>Approve</button>
            </div>
          </Card>
        )) : <div className="text-sm text-gray-500">No requests or loading...</div>}
      </div>

      <div className="mt-4"><h4 className="font-semibold">Last API response</h4><div className="mt-2"><CollapsibleJSON data={resp} /></div></div>
    </div>
  )
}
