import React, { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function LoginRegister(){
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({name:'', email:'', password:'', role:'customer'})
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  function update(e){
    setForm(f=>({...f,[e.target.name]:e.target.value}))
  }

  async function submit(e){
    e.preventDefault()
    setErr(null)
    try{
      if(mode === 'login'){
        const res = await api.post('/auth/login', { email: form.email, password: form.password })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.role || 'customer')
        navigate('/customer')
      } else {
        const res = await api.post('/auth/register', { name: form.name, email: form.email, password: form.password, role: form.role })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.role || form.role)
        navigate('/customer')
      }
    }catch(e){
      setErr(e?.response?.data?.message || e.message)
    }
  }

  return (
    <div className="card auth-card">
      <div className="tabs">
        <button className={mode==='login'?'active':''} onClick={()=>setMode('login')}>Login</button>
        <button className={mode==='register'?'active':''} onClick={()=>setMode('register')}>Register</button>
      </div>

      <form onSubmit={submit} className="form">
        {mode==='register' && (
          <input name="name" placeholder="Full name" value={form.name} onChange={update} required />
        )}
        <input name="email" placeholder="Email" value={form.email} onChange={update} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={update} required />
        {mode==='register' && (
          <select name="role" value={form.role} onChange={update}>
            <option value="customer">customer</option>
            <option value="employee">employee</option>
            <option value="manager">manager</option>
            <option value="admin">admin</option>
          </select>
        )}
        <button type="submit">{mode==='login'?'Login':'Register'}</button>
        {err && <div className="error">{err}</div>}
      </form>
    </div>
  )
}
