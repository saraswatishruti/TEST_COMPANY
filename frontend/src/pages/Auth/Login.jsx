import React, { useState, useContext } from 'react'
import api from '../../api/axios'
import { AuthContext } from '../../context/AuthContext'
import { emitDebug } from '../../components/debugEmit'
import { useNavigate } from 'react-router-dom'
import { Card, Toast } from '../../components/UiElements'

export default function Login(){
  const [form, setForm] = useState({email:'', password:''})
  const [resp, setResp] = useState(null)
  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const [notice, setNotice] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const r = await api.post('/api/auth/login', form)
      setResp(r.data)
      emitDebug(r)
      if(r.data && r.data.token){
        setToken(r.data.token)
        localStorage.setItem('token', r.data.token)
        setNotice({ type: 'success', message: 'Logged in — redirecting...' })
        setTimeout(()=>navigate('/'), 600)
      }
    }catch(err){
      const d = err.response ? err.response.data : {error: err.message}
      setResp(d)
      emitDebug(err.response || {error: err.message})
      setNotice({ type: 'error', message: d.error || 'Login failed' })
    }
  }

  return (
    <div className="max-w-md mx-auto my-12">
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold">Sign in</h3>
            <p className="text-sm text-gray-500">Use the API to test auth flows</p>
          </div>

          {notice && <Toast type={notice.type} message={notice.message} />}

          <form onSubmit={submit} className="space-y-3">
            <label className="block text-sm text-gray-600">Email</label>
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Email" />
            <label className="block text-sm text-gray-600">Password</label>
            <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Password" />
            <div className="flex justify-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Login</button>
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
