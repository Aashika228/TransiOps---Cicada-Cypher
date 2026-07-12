'use client'

import { AlertCircle, BarChart3, Settings } from 'lucide-react'

export function ManagerView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-extrabold text-slate-900">Fleet Manager Overview</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Vehicle Status Breakdown - Donut Chart */}
        <div className="premium-card rounded-2xl p-6 relative overflow-hidden">
          <h3 className="font-bold text-slate-900 mb-6">Vehicle Status</h3>
          <div className="flex flex-col items-center justify-center relative h-48">
            <svg viewBox="0 0 100 100" className="w-40 h-40 transform -rotate-90">
              {/* Retired (background) */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="16" />
              {/* In Shop (red) 8% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray="25 226" strokeDashoffset="-25" />
              {/* On Trip (blue) 64% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0ea5e9" strokeWidth="16" strokeDasharray="160 91" strokeDashoffset="-50" />
              {/* Available (emerald) 26% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="65 186" strokeDashoffset="-210" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900">142</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500" /><span className="text-xs font-semibold text-slate-600">Available (38)</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-sky-500" /><span className="text-xs font-semibold text-slate-600">On Trip (92)</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-500" /><span className="text-xs font-semibold text-slate-600">In Shop (12)</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-slate-200" /><span className="text-xs font-semibold text-slate-600">Retired (15)</span></div>
          </div>
        </div>

        {/* Fleet Utilization Trend - Line Chart */}
        <div className="premium-card rounded-2xl p-6 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">Fleet Utilization Trend (Last 7 Days)</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">+4.2%</span>
          </div>
          <div className="flex-1 relative flex items-end justify-between px-2 pb-6 pt-10">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              {[100, 75, 50, 25, 0].map(y => (
                <div key={y} className="flex items-center w-full">
                  <span className="text-[9px] text-slate-300 w-6">{y}%</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
              ))}
            </div>
            
            {/* Bars/Line visualization (simplified to bars for clean CSS) */}
            {[
              { day: 'Mon', val: 55 }, { day: 'Tue', val: 62 }, { day: 'Wed', val: 60 },
              { day: 'Thu', val: 68 }, { day: 'Fri', val: 74 }, { day: 'Sat', val: 82 }, { day: 'Sun', val: 64 }
            ].map((d, i) => (
              <div key={i} className="relative flex flex-col items-center flex-1 h-full justify-end group">
                <div className="w-full max-w-[32px] rounded-t-md transition-all duration-300 group-hover:bg-cyan-400" 
                  style={{ height: `${d.val}%`, background: 'linear-gradient(to top, #0ea5e9, #38bdf8)' }} />
                <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400">{d.day}</span>
                {/* Tooltip */}
                <div className="absolute -top-8 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.val}%
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Top 5 Vehicles - Horizontal Bar */}
        <div className="premium-card rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 mb-6">Top 5 Highly Utilized Vehicles</h3>
          <div className="space-y-4">
            {[
              { name: 'Volvo FH-16 (MH-04-1111)', trips: 142, max: 150 },
              { name: 'Tata Prima (DL-01-2222)', trips: 128, max: 150 },
              { name: 'Scania R-Series (KA-03-3333)', trips: 115, max: 150 },
              { name: 'Ashok Leyland (TN-02-4444)', trips: 98, max: 150 },
              { name: 'BharatBenz (UP-32-5555)', trips: 84, max: 150 },
            ].map((v, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700">{v.name}</span>
                  <span className="text-slate-500">{v.trips} trips</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${(v.trips / v.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Alerts - Table */}
        <div className="premium-card rounded-2xl p-6 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900">Maintenance Alerts</h3>
            <button className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-slate-900 transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Vehicle</th>
                  <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Last Service</th>
                  <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Km Since</th>
                  <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { v: 'MH-12-AB-9012', last: '12 Jan 2024', km: '14,200', status: 'Due Soon', color: 'text-amber-600 bg-amber-50' },
                  { v: 'DL-01-XY-8877', last: '04 Mar 2024', km: '21,500', status: 'Critical', color: 'text-red-600 bg-red-50' },
                  { v: 'KA-05-PQ-3344', last: '22 Feb 2024', km: '8,400', status: 'OK', color: 'text-emerald-600 bg-emerald-50' },
                  { v: 'TN-10-LM-5566', last: '15 Jan 2024', km: '13,800', status: 'Due Soon', color: 'text-amber-600 bg-amber-50' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-bold text-slate-800">{row.v}</td>
                    <td className="py-2.5 text-slate-500 font-medium">{row.last}</td>
                    <td className="py-2.5 text-slate-600 font-semibold">{row.km}</td>
                    <td className="py-2.5 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${row.color}`}>{row.status}</span>
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
