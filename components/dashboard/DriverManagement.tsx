'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, User, Trash2, ShieldAlert, ShieldCheck, MapPin, X } from 'lucide-react'

export function DriverManagement() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const [drivers, setDrivers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    licenseCategory: 'Heavy Commercial (HGMV)',
    licenseExpiry: '',
    phone: ''
  })

  const fetchDrivers = async () => {
    try {
      const res = await fetch('/api/drivers')
      const data = await res.json()
      if (Array.isArray(data)) {
        setDrivers(data)
      } else {
        console.error('API Error:', data)
        setDrivers([])
      }
    } catch (err) {
      console.error(err)
      setDrivers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrivers()
    const interval = setInterval(fetchDrivers, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setShowAddModal(false)
        fetchDrivers()
        setFormData({ name: '', licenseNumber: '', licenseCategory: 'Heavy Commercial (HGMV)', licenseExpiry: '', phone: '' })
      } else {
        const err = await res.json()
        console.warn('API Warning:', err.error)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this driver?')) return
    try {
      const res = await fetch(`/api/drivers/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchDrivers()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to delete')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
    if (score >= 50) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/30'
    return 'text-red-600 bg-red-50 dark:bg-red-950/30'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
    return <ShieldAlert className={`h-3.5 w-3.5 ${score >= 50 ? 'text-amber-500' : 'text-red-500'}`} />
  }

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-900 dark:text-slate-50">Driver Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Manage driver profiles, licenses, and safety scores.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md dark:shadow-none hover:bg-slate-800 transition-colors">
          <Plus className="h-4 w-4" />
          Add Driver
        </button>
      </div>

      <div className="premium-card rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input type="text" placeholder="Search by name, license or phone..." className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="flex-1 sm:flex-none text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 outline-none">
              <option>All Statuses</option>
              <option>Available</option>
              <option>On Trip</option>
              <option>Off Duty</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold">Driver Profile</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold">License No.</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold">Category</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold">Expiry Date</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold">Current Location</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold">Safety Score</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold text-right">Status</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={8} className="p-4 text-center text-slate-500 dark:text-slate-400 dark:text-slate-500">Loading drivers...</td></tr>
              ) : drivers.length === 0 ? (
                <tr><td colSpan={8} className="p-4 text-center text-slate-500 dark:text-slate-400 dark:text-slate-500">No drivers found.</td></tr>
              ) : drivers.map((d, i) => {
                let statusColor = 'bg-emerald-100 text-emerald-700';
                if (d.status === 'On Trip') statusColor = 'bg-blue-100 text-blue-700';
                if (d.status === 'Off Duty') statusColor = 'bg-amber-100 text-amber-700';
                if (d.status === 'Suspended') statusColor = 'bg-red-100 text-red-700';

                return (
                <tr key={d._id || i} className="border-b border-slate-50 hover:bg-slate-50 dark:bg-slate-800 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-white shadow-sm dark:shadow-none overflow-hidden">
                      <User className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    </div>
                    <div>
                      <p>{d.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold">{d.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 dark:text-slate-500 font-mono text-xs">{d.licenseNumber}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 dark:text-slate-500 font-medium">{d.licenseCategory}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 dark:text-slate-500 font-medium">{new Date(d.licenseExpiry).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    {d.status === 'On Trip' && d.currentLocation && d.currentLocation !== '-' ? (
                      <button 
                        onClick={() => setSelectedLocation(d.currentLocation)}
                        className="flex items-center gap-1.5 hover:bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-md transition-colors group/loc"
                      >
                        <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover/loc:text-emerald-700">
                          {d.currentLocation} <span className="text-[10px] text-emerald-600/70 ml-1">(JioTrack)</span>
                        </span>
                      </button>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500 font-bold ml-2">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-bold ${getScoreColor(d.safetyScore)}`}>
                      {getScoreIcon(d.safetyScore)}
                      {d.safetyScore}/100
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${statusColor}`}>{d.status}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleDelete(d._id)} className="text-slate-400 dark:text-slate-500 hover:text-red-600 transition-colors p-1" title="Delete Driver"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-none w-full max-w-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">Live GPS Tracking (JioTrack)</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Last known location: {selectedLocation}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLocation(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 dark:text-slate-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="w-full h-[400px] bg-slate-100 dark:bg-slate-800/80 relative flex items-center justify-center">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />
              
              {/* Custom Centered Live Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center pb-8">
                <span className="flex h-8 w-8 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-emerald-500 border-4 border-white shadow-lg dark:shadow-none items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-white dark:bg-slate-900 rounded-full" />
                  </span>
                </span>
                <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 shadow-lg dark:shadow-none shadow-slate-900/20">
                  {selectedLocation.split(',')[0]}
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="bg-white dark:bg-slate-900/90 backdrop-blur rounded-xl p-3 shadow-lg dark:shadow-none border border-slate-200 dark:border-slate-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Connection Active
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded uppercase tracking-widest border border-emerald-100">
                    Powered by Jio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-none w-full max-w-md p-6">
            <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-slate-50">Add New Driver</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Driver Name</label>
                <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm" placeholder="e.g. Alex"/>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">License Number</label>
                <input required value={formData.licenseNumber} onChange={e=>setFormData({...formData, licenseNumber: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm" placeholder="e.g. DL-12345"/>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
                <select value={formData.licenseCategory} onChange={e=>setFormData({...formData, licenseCategory: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm">
                  <option>Heavy Commercial (HGMV)</option><option>Medium Commercial (MGMV)</option><option>Light Commercial (LGMV)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">License Expiry Date</label>
                <input required type="date" value={formData.licenseExpiry} onChange={e=>setFormData({...formData, licenseExpiry: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm"/>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Contact Number</label>
                <input required value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm" placeholder="e.g. +91 9876543210"/>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:text-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700">Add Driver</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
