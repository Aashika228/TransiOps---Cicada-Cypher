'use client'

import { useState } from 'react'
import { Plus, Search, User, MoreHorizontal, ShieldAlert, ShieldCheck, MapPin, X } from 'lucide-react'

export function DriverManagement() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const drivers = [
    { name: 'Amit Sharma', lic: 'DL-1420110012345', cat: 'Heavy Commercial (HGMV)', exp: '15 Jul 2024', phone: '+91 98765 43210', score: 94, location: 'Surat, Gujarat', status: 'On Trip', statusColor: 'bg-blue-100 text-blue-700' },
    { name: 'Rajesh Kumar', lic: 'UP-3220150098765', cat: 'Heavy Commercial (HGMV)', exp: '20 Jul 2024', phone: '+91 91234 56780', score: 45, location: 'New Delhi', status: 'Available', statusColor: 'bg-emerald-100 text-emerald-700' },
    { name: 'Suresh Singh', lic: 'HR-2620180054321', cat: 'Medium Commercial (MGMV)', exp: '05 Aug 2024', phone: '+91 99887 76655', score: 82, location: 'Mumbai, Maharashtra', status: 'Available', statusColor: 'bg-emerald-100 text-emerald-700' },
    { name: 'Vikram Patel', lic: 'GJ-0120190011223', cat: 'Light Commercial (LGMV)', exp: '12 Aug 2024', phone: '+91 98712 34560', score: 68, location: 'Ahmedabad, Gujarat', status: 'Off Duty', statusColor: 'bg-amber-100 text-amber-700' },
    { name: 'Manoj Tiwari', lic: 'MP-0920200022334', cat: 'Heavy Commercial (HGMV)', exp: '25 Dec 2025', phone: '+91 91122 33445', score: 32, location: '-', status: 'Suspended', statusColor: 'bg-red-100 text-red-700' },
    { name: 'Ramesh Singh', lic: 'RJ-1420210044556', cat: 'Heavy Commercial (HGMV)', exp: '10 Jan 2026', phone: '+91 95566 77889', score: 88, location: 'Jaipur, Rajasthan', status: 'On Trip', statusColor: 'bg-blue-100 text-blue-700' },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50'
    if (score >= 50) return 'text-amber-600 bg-amber-50'
    return 'text-red-600 bg-red-50'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
    return <ShieldAlert className={`h-3.5 w-3.5 ${score >= 50 ? 'text-amber-500' : 'text-red-500'}`} />
  }

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-900">Driver Management</h2>
          <p className="text-sm text-slate-500 font-medium">Manage driver profiles, licenses, and safety scores.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
          <Plus className="h-4 w-4" />
          Add Driver
        </button>
      </div>

      <div className="premium-card rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search by name, license or phone..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="flex-1 sm:flex-none text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none">
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
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Driver Profile</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">License No.</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Category</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Expiry Date</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Current Location</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Safety Score</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-right">Status</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {drivers.map((d, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p>{d.name}</p>
                      <p className="text-[10px] text-slate-500 font-semibold">{d.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">{d.lic}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{d.cat}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{d.exp}</td>
                  <td className="px-6 py-4">
                    {d.location !== '-' ? (
                      <button 
                        onClick={() => setSelectedLocation(d.location)}
                        className="flex items-center gap-1.5 hover:bg-emerald-50 px-2 py-1 rounded-md transition-colors group/loc"
                      >
                        <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-xs font-bold text-slate-700 group-hover/loc:text-emerald-700">
                          {d.location} <span className="text-[10px] text-emerald-600/70 ml-1">(JioTrack)</span>
                        </span>
                      </button>
                    ) : (
                      <span className="text-slate-400 font-bold ml-2">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-bold ${getScoreColor(d.score)}`}>
                      {getScoreIcon(d.score)}
                      {d.score}/100
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${d.statusColor}`}>{d.status}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors p-1"><MoreHorizontal className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Live GPS Tracking (JioTrack)</h3>
                  <p className="text-xs text-slate-500 font-medium">Last known location: {selectedLocation}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLocation(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="w-full h-[400px] bg-slate-100 relative flex items-center justify-center">
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
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-emerald-500 border-4 border-white shadow-lg items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </span>
                </span>
                <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 shadow-lg shadow-slate-900/20">
                  {selectedLocation.split(',')[0]}
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg border border-slate-200/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Connection Active
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-widest border border-emerald-100">
                    Powered by Jio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
