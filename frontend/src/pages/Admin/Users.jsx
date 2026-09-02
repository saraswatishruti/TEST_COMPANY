import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'

export default function AdminUsers(){
  const [resp, setResp] = useState(null)

  useEffect(()=>{ (async ()=>{ try{ const r = await api.get('/api/admin/users'); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) } })() },[])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Admin: Users</h3>
      <div className="overflow-auto bg-white border rounded p-2">
        <pre className="text-xs">{JSON.stringify(resp, null, 2)}</pre>
      </div>
    </div>
  )
}
