'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Plus, Search, MapPin, MoreHorizontal, ArrowRight, Map, Crosshair, X } from 'lucide-react'

// Dynamically import the map to avoid SSR issues with Leaflet window object
const MapPicker = dynamic(() => import('@/components/dashboard/MapPicker'), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500 font-bold animate-pulse">Loading interactive map...</div>
})

export function TripManagement() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [mapModalType, setMapModalType] = useState<'source' | 'destination' | null>(null)
  const [selectedMapAddress, setSelectedMapAddress] = useState('')

  const [trips, setTrips] = useState<any[]>([])
  const [vehicles, setVehicles] = useState<any[]>([])
  const [drivers, setDrivers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    vehicleId: '',
    driverId: '',
    cargoWeight: '',
    plannedDistance: ''
  })

  import { useEffect } from 'react'
  
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [tRes, vRes, dRes] = await Promise.all([
        fetch('/api/trips'),
        fetch('/api/vehicles'),
        fetch('/api/drivers')
      ])
      const tData = await tRes.json()
      const vData = await vRes.json()
      const dData = await dRes.json()
      if (Array.isArray(tData)) setTrips(tData)
      if (Array.isArray(vData)) setVehicles(vData)
      if (Array.isArray(dData)) setDrivers(dData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.vehicleId || !formData.driverId || !formData.cargoWeight || !source || !destination) return
    
    try {
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          destination,
          vehicleId: formData.vehicleId,
          driverId: formData.driverId,
          cargoWeight: Number(formData.cargoWeight),
          plannedDistance: Number(formData.plannedDistance)
        })
      })
      const data = await res.json()
      if (res.ok) {
        fetchData()
        setSource('')
        setDestination('')
        setFormData({ vehicleId: '', driverId: '', cargoWeight: '', plannedDistance: '' })
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleStatusUpdate = async (id: string, action: 'dispatch' | 'complete' | 'cancel') => {
    const payload = action === 'complete' ? { finalOdometer: 100000, fuelConsumedLiters: 50, fuelCost: 5000 } : {}
    try {
      const res = await fetch(`/api/trips/${id}/${action}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        fetchData()
      } else {
        const data = await res.json()
        alert(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }


  const handleConfirmLocation = () => {
    // Fallback to random if nothing fetched
    const finalLocation = selectedMapAddress && selectedMapAddress !== 'Click anywhere on the map to drop a pin' 
      ? selectedMapAddress 
      : 'Jio Campus, Navi Mumbai'
    
    if (mapModalType === 'source') {
      setSource(finalLocation)
    } else if (mapModalType === 'destination') {
      setDestination(finalLocation)
    }
    
    setMapModalType(null)
    setSelectedMapAddress('')
  }

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-900">Trip Management</h2>
          <p className="text-sm text-slate-500 font-medium">Create and track trips through their lifecycle.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700 transition-colors shadow-emerald-600/20">
          <Plus className="h-4 w-4" />
          Create Trip
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Create Form Mockup (Left Column) */}
        <div className="premium-card rounded-2xl p-6 lg:col-span-1">
          <h3 className="font-bold text-slate-900 mb-6">Quick Create Trip</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Source (Origin)</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Delhi Hub" 
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" 
                  required
                />
                <button 
                  type="button"
                  onClick={() => setMapModalType('source')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-md transition-colors group"
                  title="Select on Map"
                >
                  <Map className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-center -my-2 relative z-10 pointer-events-none">
              <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                <ArrowRight className="h-3 w-3 rotate-90" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Destination</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Mumbai Depo" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" 
                  required
                />
                <button 
                  type="button"
                  onClick={() => setMapModalType('destination')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-md transition-colors group"
                  title="Select on Map"
                >
                  <Map className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Assign Vehicle</label>
                <select 
                  value={formData.vehicleId}
                  onChange={e => setFormData({...formData, vehicleId: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors"
                  required
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.filter(v => v.status === 'Available').map(v => (
                    <option key={v._id} value={v._id}>{v.registrationNumber} (Max: {v.maxLoadCapacity}kg)</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Assign Driver</label>
                <select 
                  value={formData.driverId}
                  onChange={e => setFormData({...formData, driverId: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors"
                  required
                >
                  <option value="">Select Driver</option>
                  {drivers.filter(d => d.status === 'Available').map(d => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Cargo Wt (kg)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 450" 
                  value={formData.cargoWeight}
                  onChange={e => setFormData({...formData, cargoWeight: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" 
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Distance (km)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 1420" 
                  value={formData.plannedDistance}
                  onChange={e => setFormData({...formData, plannedDistance: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" 
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full mt-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
              Save as Draft
            </button>
          </form>
        </div>

        {/* Trip Board (Right Column) */}
        <div className="premium-card rounded-2xl overflow-hidden flex flex-col lg:col-span-2">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Trip Lifecycle</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search trips..." className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-emerald-500 outline-none transition-colors" />
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Trip ID</th>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Route</th>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Assignment</th>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-right">Status</th>
                  <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr><td colSpan={5} className="p-4 text-center text-slate-500">Loading trips...</td></tr>
                ) : trips.length === 0 ? (
                  <tr><td colSpan={5} className="p-4 text-center text-slate-500">No trips found.</td></tr>
                ) : trips.map((t, i) => {
                  let statusColor = 'bg-slate-200 text-slate-700'
                  if (t.status === 'Dispatched') statusColor = 'bg-blue-100 text-blue-700'
                  if (t.status === 'Completed') statusColor = 'bg-emerald-100 text-emerald-700'
                  if (t.status === 'Cancelled') statusColor = 'bg-red-100 text-red-700'
                  
                  // Need to resolve names from lists
                  const v = vehicles.find(v => v._id === t.vehicleId)
                  const d = drivers.find(d => d._id === t.driverId)
                  
                  return (
                  <tr key={t._id || i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-4 font-bold text-slate-800 font-mono text-xs">{t._id?.substring(t._id.length - 6).toUpperCase()}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700 font-bold"><MapPin className="h-3 w-3 text-slate-400" /> {t.source}</div>
                        <div className="flex items-center gap-1.5 text-slate-700 font-bold"><MapPin className="h-3 w-3 text-emerald-500" /> {t.destination}</div>
                        <span className="text-[10px] text-slate-500 font-medium ml-4 mt-0.5">{t.plannedDistance}km • {t.cargoWeight}kg</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600 font-medium text-xs">
                      <p className="font-bold text-slate-700">{v?.registrationNumber || 'Unknown'}</p>
                      <p>{d?.name || 'Unknown'}</p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${statusColor}`}>{t.status}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {t.status === 'Draft' && (
                        <div className="flex flex-col gap-1">
                          <button onClick={() => handleStatusUpdate(t._id, 'dispatch')} className="text-[10px] bg-blue-500 text-white px-2 py-1 rounded">Dispatch</button>
                          <button onClick={() => handleStatusUpdate(t._id, 'cancel')} className="text-[10px] bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                        </div>
                      )}
                      {t.status === 'Dispatched' && (
                        <div className="flex flex-col gap-1">
                          <button onClick={() => handleStatusUpdate(t._id, 'complete')} className="text-[10px] bg-emerald-500 text-white px-2 py-1 rounded">Complete</button>
                          <button onClick={() => handleStatusUpdate(t._id, 'cancel')} className="text-[10px] bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* JioTrack Location Picker Modal */}
      {mapModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Map className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Select {mapModalType === 'source' ? 'Origin' : 'Destination'}</h3>
                  <p className="text-xs text-slate-500 font-medium">Click on the map to drop a pin.</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setMapModalType(null)
                  setSelectedMapAddress('')
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="w-full h-[450px] bg-slate-100 relative">
              <MapPicker onLocationSelect={(loc) => setSelectedMapAddress(loc)} />

              {/* Confirm Button Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-auto">
                <div className="bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg border border-slate-200/50 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-widest border border-blue-100">
                    JioTrack
                  </span>
                  <span className="text-xs font-bold text-slate-700">Location selected</span>
                </div>
                <button 
                  onClick={handleConfirmLocation}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-xl hover:bg-slate-800 transition-transform active:scale-95"
                >
                  Confirm Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
