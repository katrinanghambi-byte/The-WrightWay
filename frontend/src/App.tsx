// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Portfolio from './pages/Portfolio'
import { useState } from 'react'

const queryClient = new QueryClient()

// Simple auth context (replace with real JWT later)
function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token')
  return token ? <>{children}</> : <Navigate to="/" />
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/portfolio"
            element={
              <RequireAuth>
                <Portfolio />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}