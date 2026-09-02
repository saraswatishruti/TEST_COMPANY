import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { emitDebug } from '../components/debugEmit'
import { Card } from '../components/UiElements'

export default function DebugPage(){
  const [resp, setResp] = useState(null)

  useEffect(()=>{
    (async ()=>{
      try{ const r = await api.get('/debug'); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) }
    })()
  },[])

  return (
    <div className="max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold mb-3">Debug</h3>
      <Card>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-auto">
          <pre>{JSON.stringify(resp, null, 2)}</pre>
        </div>
      </Card>
    </div>
  )
}
