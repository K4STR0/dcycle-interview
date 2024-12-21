import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './HomePage/HomePage'
import { NamePage } from './ejercicio1/pages/NamePage/NamePage'
import { CovidPage } from './ejercicio2/pages/CovidPage/CovidPage'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ejercicio1" element={<NamePage />} />
        <Route path="/ejercicio2" element={<CovidPage />} />
      </Routes>
    </BrowserRouter>
  )
}
