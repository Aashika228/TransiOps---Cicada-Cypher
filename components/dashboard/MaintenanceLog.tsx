'use client'

import { Plus, Search, Wrench, MoreHorizontal, Calendar, Info } from 'lucide-react'
import { useState, useEffect } from 'react'

export function MaintenanceLog() {
  const [records, setRecords] = useState<any[]>([])
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    vehicleId: '',
    date: '',
    issueDescription: '',
    cost: ''
  })

  useEffect(() => {
    fetchData()
    fetchVehicles()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/maintenance')
      const data = await res.json()
      if (Array.isArray(data)) {
        setRecords(data)
      } else {
        console.error('API Error:', data)
        setRecords([])
      }
    } catch (error) {
      console.error(error)
      setRecords([])
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
    if (!formData.vehicleId || !formData.issueDescription || !formData.cost) return
    
    try {
      await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: formData.vehicleId,
          date: formData.date || new Date().toISOString(),
          issueDescription: formData.issueDescription,
          cost: Number(formData.cost)
        })
      })
      // Refresh data and reset form
      fetchData()
      setFormData({ vehicleId: '', date: '', issueDescription: '', cost: '' })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-900">Maintenance Log</h2>
          <p className="text-sm text-slate-500 font-medium">Record maintenance and automatically update vehicle availability.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Create Form Mockup (Left Column) */}
        <div className="premium-card rounded-2xl p-6 lg:col-span-1 h-fit">
          <h3 className="font-bold text-slate-900 mb-2">Log Maintenance</h3>
          
          <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 items-start">
            <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-blue-800 leading-relaxed">
              Adding a vehicle to the Maintenance Log automatically sets its status to <span className="font-bold">"In Shop"</span>, removing it from the active Driver selection pool.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Vehicle</label>
              <select 
                value={formData.vehicleId}
                onChange={e => setFormData({...formData, vehicleId: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors"
                required
              >
                <option value="">Select Vehicle</option>
                {vehicles.map(v => (
                  <option key={v._id} value={v._id}>{v.registrationNumber} ({v.status})</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Service Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Description of Work</label>
              <textarea 
                placeholder="Describe the maintenance..." 
                rows={3} 
                value={formData.issueDescription}
                onChange={e => setFormData({...formData, issueDescription: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors resize-none" 
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Cost (₹)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={formData.cost}
                onChange={e => setFormData({...formData, cost: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" 
                required
              />
            </div>

            <button type="submit" className="w-full mt-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" /> Add Record & Send to Shop
            </button>
          </form>
        </div>

        {/* Maintenance Log Table (Right Column) */}
        <div className="premium-card rounded-2xl overflow-hidden flex flex-col lg:col-span-2">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Service History</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search records..." className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-emerald-500 outline-none transition-colors" />
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Vehicle</th>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Date</th>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Description</th>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Cost</th>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr><td colSpan={5} className="p-4 text-center text-slate-500">Loading records...</td></tr>
                ) : records.length === 0 ? (
                  <tr><td colSpan={5} className="p-4 text-center text-slate-500">No maintenance records found.</td></tr>
                ) : records.map((r, i) => (
                  <tr key={r._id || i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-4 font-bold text-slate-800 font-mono text-xs flex items-center gap-2">
                      <Wrench className="h-3.5 w-3.5 text-slate-400" />
                      {/* Usually you'd populate vehicleId to get the registrationNumber */}
                      {r.vehicleId?.substring(0, 8) || 'Unknown'}
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-medium text-xs">{new Date(r.date).toLocaleDateString()}</td>
                    <td className="px-4 py-4 text-slate-700 font-medium">{r.issueDescription}</td>
                    <td className="px-4 py-4 text-slate-900 font-bold">₹{r.cost}</td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${r.status === 'Closed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{r.status}</span>
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
