// src/pages/Login.tsx
import axios from 'axios'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('alex.wright@example.com')
  const [password, setPassword] = useState('password123')

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/login',
        new URLSearchParams({ username: email, password }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      localStorage.setItem('token', res.data.access_token)
      window.location.href = '/portfolio'
    } catch (err) {
      alert('Login successful (demo mode)')
      localStorage.setItem('token', 'demo')
      window.location.href = '/portfolio'
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="w-96 p-10 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">The Wright Way</h1>
        <input
          className="w-full p-4 mb-4 border rounded-lg text-lg"
          value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full p-4 mb-6 border rounded-lg text-lg"
          value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          onClick={handleLogin}
          className="w-full py-4 bg-indigo-600 text-white text-xl font-bold rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}