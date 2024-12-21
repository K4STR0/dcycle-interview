import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify'
import { AppRouter } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
    <ToastContainer
      theme="dark"
      toastStyle={{
        backgroundColor: 'var(--color-background-secondary)',
      }}
    />
  </React.StrictMode>
)
