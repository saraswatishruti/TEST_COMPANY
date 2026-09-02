// helper to dispatch debug events
export function emitDebug(payload){
  try{ window.dispatchEvent(new CustomEvent('banking:debug', { detail: payload })) }catch(e){}
}
