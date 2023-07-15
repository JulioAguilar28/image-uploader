import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { AuthContext, AuthDispatchContext, initialAuthContext } from './context/authContext.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContext.Provider value={initialAuthContext}>
      <AuthDispatchContext.Provider value={null}>
        <App />
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  </React.StrictMode>
)
