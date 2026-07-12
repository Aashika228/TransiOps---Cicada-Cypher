'use client'

import { Navigation, MapPin, Package, Clock, CheckCircle } from 'lucide-react'

export function DriverView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-extrabold text-slate-900">Driver Portal</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          On Duty
        </div>
      </div>

      {/* My Active Trip */}
      <div className="premium-card rounded-2xl overflow-hidden relative border-2 border-emerald-500/20 shadow-emerald-500/10">
        <div className="bg-emerald-50/50 p-4 border-b border-emerald-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Active Trip</span>
          </div>
          <span className="text-sm font-bold text-slate-900">Trip #TR-8842</span>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              {/* Route Line */}
              <div className="absolute left-[11px] top-8 bottom-8 w-0.5 bg-emerald-100" />
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm mt-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Pickup • 08:30 AM</p>
                    <p className="text-lg font-black text-slate-900">Delhi Logistics Hub</p>
                    <p className="text-sm text-slate-500">Sector 12, Dwarka</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Drop-off • ETA 16:45 PM</p>
                    <p className="text-lg font-black text-slate-900">Mumbai Central Depo</p>
                    <p className="text-sm text-slate-500">Andheri East</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Cargo</p>
                  <p className="text-sm font-bold text-slate-900">Electronics • 4.2 Tons</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-500">
                  <Navigation className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Distance Remaining</p>
                  <p className="text-sm font-bold text-slate-900">142 km (Approx 2h 15m)</p>
                </div>
              </div>
              <button className="w-full mt-2 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-slate-800 transition-colors">
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* My Trip History */}
      <div className="premium-card rounded-2xl p-6 overflow-hidden">
        <h3 className="font-bold text-slate-900 mb-4">My Trip History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Date</th>
                <th className="pb-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Route</th>
                <th className="pb-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Distance</th>
                <th className="pb-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { date: '11 Jul 2024', route: 'Jaipur → Delhi', dist: '280 km', status: 'Completed', color: 'text-emerald-700 bg-emerald-50' },
                { date: '09 Jul 2024', route: 'Agra → Jaipur', dist: '240 km', status: 'Completed', color: 'text-emerald-700 bg-emerald-50' },
                { date: '08 Jul 2024', route: 'Delhi → Agra', dist: '235 km', status: 'Completed', color: 'text-emerald-700 bg-emerald-50' },
                { date: '05 Jul 2024', route: 'Chandigarh → Delhi', dist: '250 km', status: 'Delayed', color: 'text-amber-700 bg-amber-50' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 text-slate-500 font-medium">{row.date}</td>
                  <td className="py-4 font-bold text-slate-800 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {row.route}
                  </td>
                  <td className="py-4 text-slate-600 font-semibold">{row.dist}</td>
                  <td className="py-4 text-right">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${row.color}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
