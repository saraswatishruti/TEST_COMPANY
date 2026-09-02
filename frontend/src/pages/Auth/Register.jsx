import React, { useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'
import { Card, Toast } from '../../components/UiElements'

export default function Register(){
  const [form, setForm] = useState({name:'', email:'', password:'', role:'customer'})
  const [resp, setResp] = useState(null)
  const [notice, setNotice] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const r = await api.post('/api/auth/register', form)
      setResp(r.data)
      emitDebug(r)
      setNotice({ type: 'success', message: 'Registered — check response' })
    }catch(err){
      const d = err.response ? err.response.data : {error: err.message}
      setResp(d)
      emitDebug(err.response || {error: err.message})
      setNotice({ type: 'error', message: d.error || 'Registration failed' })
    }
  }

  return (
    <div className="max-w-md mx-auto my-12">
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">Create account</h3>
            <p className="text-sm text-gray-500">Create a user via the API</p>
          </div>

          {notice && <Toast type={notice.type} message={notice.message} />}

          <form onSubmit={submit} className="space-y-3">
            <label className="block text-sm text-gray-600">Name</label>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Name" />
            <label className="block text-sm text-gray-600">Email</label>
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Email" />
            <label className="block text-sm text-gray-600">Password</label>
            <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Password" />
            <label className="block text-sm text-gray-600">Role</label>
            <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200">
              <option value="customer">customer</option>
              <option value="admin">admin</option>
            </select>
            <div className="flex justify-end">
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Register</button>
            </div>
          </form>

          <div>
            <h4 className="font-medium text-sm">Response</h4>
            <div className="mt-2">
              <pre className="text-xs bg-gray-50 border rounded p-2">{JSON.stringify(resp, null, 2)}</pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
