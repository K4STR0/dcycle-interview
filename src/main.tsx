import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { NamePage } from './ejercicio1/pages/NamePage/NamePage'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NamePage />
    <ToastContainer
      theme="dark"
      toastStyle={{
        backgroundColor: 'var(--color-background-secondary)',
      }}
    />
  </React.StrictMode>
)
