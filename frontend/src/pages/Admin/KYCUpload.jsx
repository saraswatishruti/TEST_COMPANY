import React, { useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'

export default function KYCUpload(){
  const [file, setFile] = useState(null)
  const [resp, setResp] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    if(!file) return alert('Select a file')
    const fd = new FormData()
    fd.append('kyc', file)
    try{ const r = await api.post('/api/accounts/upload-kyc', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); setResp(r.data); emitDebug(r) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}) }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">KYC Upload</h3>
      <form onSubmit={submit} className="space-y-2">
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Upload</button>
      </form>
      <div className="mt-4"><pre className="text-xs">{JSON.stringify(resp, null, 2)}</pre></div>
    </div>
  )
}
