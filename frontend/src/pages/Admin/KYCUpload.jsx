import React, { useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'
import { Card, Toast } from '../../components/UiElements'
import CollapsibleJSON from '../../components/CollapsibleJSON'

export default function KYCUpload(){
  const [file, setFile] = useState(null)
  const [resp, setResp] = useState(null)
  const [notice, setNotice] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    if(!file){ setNotice({ type: 'warn', message: 'Select a file' }); return }
    const fd = new FormData()
    fd.append('kyc', file)
    try{ const r = await api.post('/api/accounts/upload-kyc', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); setResp(r.data); emitDebug(r); setNotice({ type: 'success', message: 'Upload complete' }) }catch(err){ const d = err.response? err.response.data:{error:err.message}; setResp(d); emitDebug(err.response||{error:err.message}); setNotice({ type: 'error', message: d.error || 'Upload failed' }) }
  }

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-3">KYC Upload</h3>
      <Card>
        <form onSubmit={submit} className="space-y-4">
          <input type="file" onChange={e=>setFile(e.target.files[0])} />
          <div className="flex justify-end">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Upload</button>
          </div>
        </form>
      </Card>

      {notice && <div className="mt-4"><Toast type={notice.type} message={notice.message} /></div>}

      <div className="mt-4"><h4 className="font-semibold">Response</h4><div className="mt-2"><CollapsibleJSON data={resp} /></div></div>
    </div>
  )
}
