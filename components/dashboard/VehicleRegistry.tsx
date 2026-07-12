'use client'

import { Plus, Search, Truck, MoreHorizontal } from 'lucide-react'

import { useState, useEffect } from 'react'

export function VehicleRegistry() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    registrationNumber: '',
    name: '',
    type: 'Heavy Duty',
    maxLoadCapacity: '',
    odometer: '',
    acquisitionCost: ''
  })

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles')
      const data = await res.json()
      if (Array.isArray(data)) setVehicles(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          maxLoadCapacity: Number(formData.maxLoadCapacity),
          odometer: Number(formData.odometer),
          acquisitionCost: Number(formData.acquisitionCost)
        })
      })
      if (res.ok) {
        setShowAddModal(false)
        fetchVehicles()
        setFormData({
          registrationNumber: '', name: '', type: 'Heavy Duty', maxLoadCapacity: '', odometer: '', acquisitionCost: ''
        })
      } else {
        const err = await res.json()
        alert(err.error)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-900">Vehicle Registry</h2>
          <p className="text-sm text-slate-500 font-medium">Manage master list of all fleet vehicles.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </button>
      </div>

      <div className="premium-card rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search by registration or name..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="flex-1 sm:flex-none text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none">
              <option>All Types</option>
              <option>Heavy Duty</option>
              <option>Medium Duty</option>
              <option>Light Duty</option>
            </select>
            <select className="flex-1 sm:flex-none text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none">
              <option>All Statuses</option>
              <option>Available</option>
              <option>On Trip</option>
              <option>In Shop</option>
              <option>Retired</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Registration No.</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Name/Model</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Type</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Max Load</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Odometer</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Cost</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-right">Status</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={8} className="p-4 text-center text-slate-500">Loading vehicles...</td></tr>
              ) : vehicles.length === 0 ? (
                <tr><td colSpan={8} className="p-4 text-center text-slate-500">No vehicles registered.</td></tr>
              ) : vehicles.map((v, i) => {
                let statusColor = 'bg-slate-200 text-slate-700';
                if (v.status === 'Available') statusColor = 'bg-emerald-100 text-emerald-700';
                if (v.status === 'On Trip') statusColor = 'bg-blue-100 text-blue-700';
                if (v.status === 'In Shop') statusColor = 'bg-red-100 text-red-700';
                return (
                <tr key={v._id || i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-800 font-mono text-xs flex items-center gap-2">
                    <Truck className="h-4 w-4 text-slate-400" />
                    {v.registrationNumber}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">{v.name}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{v.type}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{v.maxLoadCapacity} kg</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{v.odometer} km</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">₹{v.acquisitionCost}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${statusColor}`}>{v.status}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors p-1"><MoreHorizontal className="h-4 w-4" /></button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-xl mb-4 text-slate-900">Add New Vehicle</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Registration Number</label>
                <input required value={formData.registrationNumber} onChange={e=>setFormData({...formData, registrationNumber: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm" placeholder="e.g. MH-04-AB-1234"/>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Vehicle Name</label>
                <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm" placeholder="e.g. Van-05"/>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Type</label>
                <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm">
                  <option>Heavy Duty</option><option>Medium Duty</option><option>Light Duty</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Max Load (kg)</label>
                  <input required type="number" value={formData.maxLoadCapacity} onChange={e=>setFormData({...formData, maxLoadCapacity: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm" placeholder="e.g. 500"/>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Odometer</label>
                  <input required type="number" value={formData.odometer} onChange={e=>setFormData({...formData, odometer: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm" placeholder="0"/>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Acquisition Cost (₹)</label>
                <input required type="number" value={formData.acquisitionCost} onChange={e=>setFormData({...formData, acquisitionCost: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-sm" placeholder="e.g. 1500000"/>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 font-bold text-slate-500 hover:text-slate-800">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700">Add Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
