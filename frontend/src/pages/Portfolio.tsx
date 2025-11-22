// src/pages/Portfolio.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b']

export default function Portfolio() {
  const queryClient = useQueryClient()
  const [ticker, setTicker] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  // Fetch holdings
  const { data: holdings = [] } = useQuery({
    queryKey: ['holdings'],
    queryFn: () => axios.get('http://127.0.0.1:8000/holdings', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => res.data)
  })

  // Add holding
  const addMutation = useMutation({
    mutationFn: (newHolding: any) => axios.post('http://127.0.0.1:8000/holdings', newHolding, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['holdings'] })
  })

  // Delete holding
  const deleteMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`http://127.0.0.1:8000/holdings/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['holdings'] })
  })

  const totalValue = holdings.reduce((sum: number, h: any) => sum + h.quantity * h.price, 0)

  const pieData = holdings.map((h: any) => ({
    name: h.ticker,
    value: h.quantity * h.price
  }))

  const lineData = [
    { month: 'Jan', value: 50000 },
    { month: 'Feb', value: 58000 },
    { month: 'Mar', value: totalValue },
  ]

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">My Portfolio – ${totalValue.toLocaleString()}</h1>

      {/* Add New Holding */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Holding</h2>
        <div className="flex gap-4">
          <input placeholder="Ticker" value={ticker} onChange={e => setTicker(e.target.value)} className="border p-3 rounded" />
          <input type="number" placeholder="Qty" value={quantity} onChange={e => setQuantity(e.target.value)} className="border p-3 rounded" />
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="border p-3 rounded" />
          <button
            onClick={() => {
              addMutation.mutate({ ticker, quantity: Number(quantity), price: Number(price) })
              setTicker(''); setQuantity(''); setPrice('')
            }}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v: any) => `$${v.toLocaleString()}`} />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={4} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                {pieData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Ticker</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Value</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h: any) => (
              <tr key={h.id} className="border-t">
                <td className="p-4 font-semibold">{h.ticker}</td>
                <td className="p-4">{h.quantity}</td>
                <td className="p-4">${h.price}</td>
                <td className="p-4 font-bold">${(h.quantity * h.price).toLocaleString()}</td>
                <td className="p-4">
                  <button
                    onClick={() => deleteMutation.mutate(h.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}