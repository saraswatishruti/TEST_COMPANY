import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'
import { Card, Spinner } from '../../components/UiElements'
import CollapsibleJSON from '../../components/CollapsibleJSON'

export default function AdminUsers(){
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{ (async ()=>{ setLoading(true); try{ const r = await api.get('/api/admin/users'); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) } finally { setLoading(false) } })() },[])

  return (
    <div className="max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold mb-3">Admin: Users</h3>

      {loading ? <div className="py-6 flex justify-center"><Spinner /></div> : null}

      {Array.isArray(resp) ? (
        resp.length === 0 ? <div className="text-center py-6 text-gray-500">No users found</div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resp.map(u=> (
              <Card key={u.id}>
                <div className="font-medium">{u.name || u.email}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
                <div className="text-xs text-gray-400 mt-2">Role: {u.role}</div>
              </Card>
            ))}
          </div>
        )
      ) : (
        <div className="bg-white border rounded p-2"><CollapsibleJSON data={resp} /></div>
      )}
    </div>
  )
}
