import React, { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Admin(){
  const [users, setUsers] = useState([])
  const [logs, setLogs] = useState([])

  useEffect(()=> load(), [])

  async function load(){
    try{ const u = await api.get('/admin/users'); setUsers(u.data || []) }catch(e){}
    try{ const a = await api.get('/admin/audit-logs'); setLogs(a.data || []) }catch(e){}
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>All Users (Sensitive Data Exposure target)</h3>
        <table className="table">
          <thead><tr><th>_id</th><th>name</th><th>email</th><th>role</th><th>passwordHash</th></tr></thead>
          <tbody>
            {users.map(u=> (
              <tr key={u._id}><td>{u._id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td><code>{u.passwordHash || u.password || '—'}</code></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Audit Logs</h3>
        <pre>{JSON.stringify(logs, null, 2)}</pre>
      </div>
    </div>
  )
}
