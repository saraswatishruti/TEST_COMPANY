import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    if(token){
      // optionally, decode or fetch profile here
      setUser({ token })
      localStorage.setItem('token', token)
    } else {
      setUser(null)
      localStorage.removeItem('token')
    }
  }, [token])

  const login = (newToken)=> setToken(newToken)
  const logout = ()=> setToken(null)

  return (
    <AuthContext.Provider value={{ token, setToken: login, logout, user, rawSetToken: setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
