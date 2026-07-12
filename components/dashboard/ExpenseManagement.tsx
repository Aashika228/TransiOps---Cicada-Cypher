'use client'

import { Plus, Search, FileText, Download, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ExpenseManagement() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    vehicleId: '',
    type: 'Fuel',
    cost: '',
    date: ''
  })

  useEffect(() => {
    fetchData()
    fetchVehicles()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/expenses')
      const data = await res.json()
      if (Array.isArray(data)) {
        setExpenses(data)
      } else {
        console.error('API Error:', data)
        setExpenses([])
      }
    } catch (error) {
      console.error(error)
      setExpenses([])
    } finally {
      setLoading(false)
    }
  }

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles')
      const data = await res.json()
      if (Array.isArray(data)) {
        setVehicles(data)
      } else {
        console.error('API Error:', data)
        setVehicles([])
      }
    } catch (error) {
      console.error(error)
      setVehicles([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.vehicleId || !formData.type || !formData.cost) return
    
    try {
      await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: formData.vehicleId,
          type: formData.type,
          cost: Number(formData.cost),
          date: formData.date || new Date().toISOString()
        })
      })
      fetchData()
      setFormData({ vehicleId: '', type: 'Fuel', cost: '', date: '' })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-900">Fuel & Expense Management</h2>
          <p className="text-sm text-slate-500 font-medium">Record fuel logs and calculate total operational costs.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        
        {/* Cost Summary Cards */}
        <div className="lg:col-span-4 grid grid-cols-3 gap-6">
          <div className="premium-card p-5 rounded-2xl flex items-center justify-between border border-amber-100 bg-amber-50/30">
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Total Fuel (30 Days)</p>
              <p className="text-3xl font-display font-black text-slate-900">₹8,45,200</p>
            </div>
          </div>
          <div className="premium-card p-5 rounded-2xl flex items-center justify-between border border-violet-100 bg-violet-50/30">
            <div>
              <p className="text-xs font-bold text-violet-700 uppercase tracking-wide mb-1">Total Tolls & Other (30 Days)</p>
              <p className="text-3xl font-display font-black text-slate-900">₹1,12,500</p>
            </div>
          </div>
          <div className="premium-card p-5 rounded-2xl flex items-center justify-between border border-slate-200 bg-slate-900 text-white">
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Vehicle</label>
                <select 
                  value={formData.vehicleId}
                  onChange={e => setFormData({...formData, vehicleId: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors text-white"
                  required
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => (
                    <option key={v._id} value={v._id}>{v.registrationNumber}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Expense Type</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors text-white"
                  required
                >
                  <option>Fuel</option>
                  <option>Toll</option>
                  <option>Maintenance</option>
                  <option>Misc</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={formData.cost}
                  onChange={e => setFormData({...formData, cost: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors text-white" 
                  required
                />
              </div>

              <button type="submit" className="w-full mt-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" /> Log Expense
              </button>
            </form>
          </div>
        </div>

        {/* Expense Log Table */}
        <div className="premium-card rounded-2xl overflow-hidden flex flex-col lg:col-span-4">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Expense Log</h3>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Search vehicle or type..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-emerald-500 outline-none transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">ID</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Vehicle</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Type/Date</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Total Cost</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr><td colSpan={5} className="p-4 text-center text-slate-500">Loading records...</td></tr>
                ) : expenses.length === 0 ? (
                  <tr><td colSpan={5} className="p-4 text-center text-slate-500">No expenses recorded.</td></tr>
                ) : expenses.map((e, i) => (
                  <tr key={e._id || i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800 font-mono text-xs">{e._id?.substring(e._id.length - 6).toUpperCase()}</td>
                    <td className="px-6 py-4 font-bold text-slate-600 text-xs">{e.vehicleId?.substring(0, 8) || 'Unknown'}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-slate-800">{e.type}</span>
                        <span className="text-[10px] text-slate-500">{new Date(e.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-bold">₹{e.cost}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">Approved</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
