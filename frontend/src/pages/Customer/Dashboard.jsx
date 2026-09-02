import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'
import CollapsibleJSON from '../../components/CollapsibleJSON'

export default function Dashboard(){
  const [accounts, setAccounts] = useState(null)
  const [resp, setResp] = useState(null)

  useEffect(()=>{
    (async ()=>{
      try{
        const r = await api.get('/api/accounts')
        setAccounts(r.data)
        setResp(r.data)
        emitDebug(r)
      }catch(err){ const d = err.response ? err.response.data : {error: err.message}; setResp(d); emitDebug(err.response || {error: err.message}) }
    })()
  },[])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Accounts</h3>
      <div className="space-y-4">
        <div>
          {accounts ? (
            <ul className="space-y-2">
              {accounts.map(acc=> (
                <li key={acc.id} className="p-2 bg-white border rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">{acc.name || ('Account ' + acc.id)}</div>
                    <div className="text-sm text-gray-600">Balance: {acc.balance}</div>
                  </div>
                  <a className="text-blue-600" href={`/accounts/${acc.id}`}>View Account Details</a>
                </li>
              ))}
            </ul>
          ) : <div className="text-sm text-gray-500">No accounts or loading...</div>}
        </div>

        <CreateAccount onResult={setResp} />

        <div>
          <h4 className="font-semibold">Raw response</h4>
          <CollapsibleJSON data={resp} />
        </div>
      </div>
    </div>
  )
}

function CreateAccount({ onResult }){
  const [form, setForm] = React.useState({name:'', type:'savings'})
  const submit = async (e)=>{
    e.preventDefault()
    try{
      const r = await api.post('/api/accounts', form)
      onResult(r.data)
      alert('Account created')
      window.dispatchEvent(new CustomEvent('banking:debug', { detail: r.data }))
    }catch(err){ const d = err.response ? err.response.data : {error: err.message}; onResult(d); window.dispatchEvent(new CustomEvent('banking:debug', { detail: d })) }
  }
  return (
    <form onSubmit={submit} className="space-y-2 max-w-md">
      <h4 className="font-semibold">Create Account</h4>
      <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border px-2 py-1" placeholder="Account name" />
      <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full border px-2 py-1">
        <option value="savings">savings</option>
        <option value="current">current</option>
      </select>
      <button className="bg-green-600 text-white px-3 py-1 rounded">Create</button>
    </form>
  )
}
