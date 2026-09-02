import React from 'react'

export default function CollapsibleJSON({ data }){
  const [open, setOpen] = React.useState(false)
  return (
    <div className="border p-2 rounded">
      <button onClick={()=>setOpen(o=>!o)} className="text-sm text-blue-600">{open? 'Hide JSON':'Show JSON'}</button>
      {open && <pre className="mt-2 text-xs whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
