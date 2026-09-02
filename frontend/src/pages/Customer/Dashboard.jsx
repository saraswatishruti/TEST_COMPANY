import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { emitDebug } from '../../components/debugEmit'
import CollapsibleJSON from '../../components/CollapsibleJSON'
import { Card } from '../../components/UiElements'

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
    <div className="max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Accounts</h3>

      <div className="space-y-6">
        <div>
          {accounts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map(acc=> (
                <Card key={acc.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Account</div>
                    <div className="text-xl font-semibold">{acc.name || ('Account ' + acc.id)}</div>
                    <div className="text-xs text-gray-400 mt-1">#{acc.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Balance</div>
                    <div className="text-2xl font-bold">{acc.balance}</div>
                    <a className="text-indigo-600 text-sm mt-2 inline-block" href={`/accounts/${acc.id}`}>View details →</a>
                  </div>
                </Card>
              ))}
            </div>
          ) : <div className="text-sm text-gray-500">No accounts or loading...</div>}
        </div>

        <CreateAccount onResult={setResp} />

        <div>
          <h4 className="font-semibold">Raw response</h4>
          <div className="mt-2">
            <CollapsibleJSON data={resp} />
          </div>
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
      window.dispatchEvent(new CustomEvent('banking:debug', { detail: r.data }))
    }catch(err){ const d = err.response ? err.response.data : {error: err.message}; onResult(d); window.dispatchEvent(new CustomEvent('banking:debug', { detail: d })) }
  }
  return (
    <form onSubmit={submit} className="space-y-3 max-w-md">
      <h4 className="font-semibold">Create Account</h4>
      <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Account name" />
      <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200">
        <option value="savings">savings</option>
        <option value="current">current</option>
      </select>
      <div className="flex justify-end">
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Create</button>
      </div>
    </form>
  )
}
