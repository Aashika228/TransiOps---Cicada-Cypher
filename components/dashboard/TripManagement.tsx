'use client'

import { Plus, Search, MapPin, MoreHorizontal, ArrowRight } from 'lucide-react'

export function TripManagement() {
  const trips = [
    { id: 'TR-8845', src: 'Delhi Hub', dst: 'Mumbai Depo', v: 'MH-04-AB-1234', d: 'Amit Sharma', load: '14.2 Tons', dist: '1420 km', status: 'Dispatched', statusColor: 'bg-blue-100 text-blue-700' },
    { id: 'TR-8844', src: 'Pune Warehouse', dst: 'Surat Port', v: 'KA-05-PQ-3344', d: 'Ramesh Singh', load: '8.5 Tons', dist: '415 km', status: 'Draft', statusColor: 'bg-slate-200 text-slate-700' },
    { id: 'TR-8843', src: 'Chennai Hub', dst: 'Bangalore Depo', v: 'TN-10-LM-5566', d: 'Vikram Patel', load: '12.0 Tons', dist: '345 km', status: 'Completed', statusColor: 'bg-emerald-100 text-emerald-700' },
    { id: 'TR-8842', src: 'Ahmedabad Port', dst: 'Delhi Hub', v: 'DL-01-XY-9876', d: 'Suresh Singh', load: '22.4 Tons', dist: '940 km', status: 'Cancelled', statusColor: 'bg-red-100 text-red-700' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
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
          <form className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Source (Origin)</label>
              <input type="text" placeholder="e.g. Delhi Hub" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" />
            </div>
            
            <div className="flex justify-center -my-2 relative z-10">
              <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                <ArrowRight className="h-3 w-3 rotate-90" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Destination</label>
              <input type="text" placeholder="e.g. Mumbai Depo" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Assign Vehicle</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors">
                  <option>Select Vehicle</option>
                  <option>MH-04-AB-1234</option>
                  <option>TN-10-LM-5566</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Assign Driver</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors">
                  <option>Select Driver</option>
                  <option>Rajesh Kumar</option>
                  <option>Suresh Singh</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Cargo Weight</label>
                <input type="text" placeholder="e.g. 14.5 Tons" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Planned Distance</label>
                <input type="text" placeholder="e.g. 1420 km" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" />
              </div>
            </div>

            <button type="button" className="w-full mt-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
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
                {trips.map((t, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-4 font-bold text-slate-800 font-mono text-xs">{t.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700 font-bold"><MapPin className="h-3 w-3 text-slate-400" /> {t.src}</div>
                        <div className="flex items-center gap-1.5 text-slate-700 font-bold"><MapPin className="h-3 w-3 text-emerald-500" /> {t.dst}</div>
                        <span className="text-[10px] text-slate-500 font-medium ml-4 mt-0.5">{t.dist} • {t.load}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600 font-medium text-xs">
                      <p className="font-bold text-slate-700">{t.v}</p>
                      <p>{t.d}</p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${t.statusColor}`}>{t.status}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button className="text-slate-400 hover:text-slate-900 transition-colors p-1"><MoreHorizontal className="h-4 w-4" /></button>
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
