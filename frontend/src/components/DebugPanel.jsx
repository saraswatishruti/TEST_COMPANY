import React, { useState } from 'react'

export default function DebugPanel(){
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState(null)

  // Global debug hook: pages can dispatch a custom event with detail = response
  React.useEffect(()=>{
    function handler(e){ setLast(e.detail); setOpen(true) }
    window.addEventListener('banking:debug', handler)
    return ()=> window.removeEventListener('banking:debug', handler)
  },[])

  return (
    <div className={`fixed right-0 top-16 w-96 bg-white border-l h-[80vh] transition-transform ${open? 'translate-x-0':'translate-x-full'}`}>
      <div className="p-3 border-b flex justify-between items-center">
        <strong>Debug Panel</strong>
        <button className="text-sm" onClick={()=>setOpen(o=>!o)}>{open? 'Close':'Open'}</button>
      </div>
      <div className="p-3 overflow-auto h-full">
        {last ? <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(last, null, 2)}</pre> : <div className="text-sm text-gray-500">No API calls yet. Trigger any request to see raw response here.</div>}
      </div>
    </div>
  )
}
