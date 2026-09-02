import React, { useState } from 'react'
import api from '../api/axios'

export default function KYC(){
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('')

  async function upload(e){
    e.preventDefault()
    if(!file) return
    const fd = new FormData()
    fd.append('kyc', file)
    try{
      await api.post('/accounts/upload-kyc', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setMsg('Uploaded')
    }catch(e){ setMsg('Upload failed') }
  }

  return (
    <div className="card">
      <h3>KYC Upload (Insecure file upload target)</h3>
      <form onSubmit={upload} className="form">
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button>Upload</button>
      </form>
      {msg && <div className="info">{msg}</div>}
    </div>
  )
}
