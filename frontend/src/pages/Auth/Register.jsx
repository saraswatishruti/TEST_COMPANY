import React, { useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'

export default function Register(){
  const [form, setForm] = useState({name:'', email:'', password:'', role:'customer'})
  const [resp, setResp] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const r = await api.post('/api/auth/register', form)
      setResp(r.data)
      emitDebug(r)
      alert('Registered — check response')
    }catch(err){ setResp(err.response ? err.response.data : {error: err.message}); emitDebug(err.response || {error: err.message}) }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Register</h3>
      <form onSubmit={submit} className="space-y-2 max-w-md">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border px-2 py-1" placeholder="Name" />
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border px-2 py-1" placeholder="Email" />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full border px-2 py-1" placeholder="Password" />
        <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="w-full border px-2 py-1">
          <option value="customer">customer</option>
          <option value="admin">admin</option>
        </select>
        <button className="bg-green-600 text-white px-3 py-1 rounded">Register</button>
      </form>
      <div className="mt-4"><strong>Response</strong><div className="mt-2"><pre className="text-xs">{JSON.stringify(resp, null, 2)}</pre></div></div>
    </div>
  )
}
