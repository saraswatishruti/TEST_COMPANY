import React, { useState, useContext } from 'react'
import api from '../../api/axios'
import { AuthContext } from '../../context/AuthContext'
import { emitDebug } from '../../components/debugEmit'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({email:'', password:''})
  const [resp, setResp] = useState(null)
  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const r = await api.post('/api/auth/login', form)
      setResp(r.data)
      emitDebug(r)
      if(r.data && r.data.token){
        setToken(r.data.token)
        localStorage.setItem('token', r.data.token)
        navigate('/')
      }
    }catch(err){ setResp(err.response ? err.response.data : {error: err.message}); emitDebug(err.response || {error: err.message}) }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Login</h3>
      <form onSubmit={submit} className="space-y-2 max-w-md">
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border px-2 py-1" placeholder="Email" />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full border px-2 py-1" placeholder="Password" />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Login</button>
      </form>
      <div className="mt-4"><strong>Response</strong><div className="mt-2"><pre className="text-xs">{JSON.stringify(resp, null, 2)}</pre></div></div>
    </div>
  )
}
