'use client'

import { AlertTriangle, FileWarning, UserX, ShieldAlert } from 'lucide-react'

export function SafetyView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-extrabold text-slate-900">Safety & Compliance Officer</h2>
      </div>

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { label: 'Expired Licenses', val: '4', icon: FileWarning, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Suspended Drivers', val: '2', icon: UserX, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Low Safety Score (<50)', val: '7', icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="premium-card p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{stat.label}</p>
                <p className="text-3xl font-display font-black text-slate-900">{stat.val}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Driver Status Breakdown - Donut */}
        <div className="premium-card rounded-2xl p-6 relative flex flex-col items-center">
          <h3 className="font-bold text-slate-900 mb-6 self-start">Driver Status Breakdown</h3>
          <div className="relative h-48 w-48 mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Background */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="16" />
              {/* Suspended (red) 5% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray="13 238" strokeDashoffset="-13" />
              {/* Off Duty (amber) 15% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray="38 213" strokeDashoffset="-26" />
              {/* On Trip (blue) 60% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="16" strokeDasharray="150 101" strokeDashoffset="-64" />
              {/* Available (emerald) 20% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="50 201" strokeDashoffset="-214" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900">182</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Drivers</span>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-2 gap-y-3 px-4">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500" /><span className="text-xs font-semibold text-slate-600">Available (36)</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-500" /><span className="text-xs font-semibold text-slate-600">On Trip (109)</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-amber-500" /><span className="text-xs font-semibold text-slate-600">Off Duty (28)</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-500" /><span className="text-xs font-semibold text-slate-600">Suspended (9)</span></div>
          </div>
        </div>

        {/* Safety Score Distribution - Histogram */}
        <div className="premium-card rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-slate-900 mb-8">Safety Score Distribution</h3>
          <div className="flex-1 relative flex items-end justify-around px-2 pb-6 pt-4">
            {/* Grid */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              {[50, 40, 30, 20, 10, 0].map(y => (
                <div key={y} className="flex items-center w-full">
                  <span className="text-[9px] text-slate-300 w-4">{y}</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
              ))}
            </div>
            
            {/* Bars */}
            {[
              { range: '<50', count: 7, color: 'bg-red-400' },
              { range: '50-60', count: 12, color: 'bg-amber-400' },
              { range: '60-70', count: 28, color: 'bg-yellow-400' },
              { range: '70-80', count: 45, color: 'bg-emerald-300' },
              { range: '80-90', count: 65, color: 'bg-emerald-400' },
              { range: '90-100', count: 25, color: 'bg-emerald-500' },
            ].map((bucket, i) => (
              <div key={i} className="relative flex flex-col items-center flex-1 mx-1 h-full justify-end group">
                <div className={`w-full rounded-t-sm transition-all duration-300 ${bucket.color}`} 
                  style={{ height: `${(bucket.count / 65) * 100}%` }} />
                <span className="absolute -bottom-6 text-[10px] font-bold text-slate-500">{bucket.range}</span>
                <span className="absolute -top-5 text-[10px] font-black text-slate-700 opacity-0 group-hover:opacity-100">{bucket.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Licenses Expiring Soon Table */}
      <div className="premium-card rounded-2xl p-6 overflow-hidden">
        <h3 className="font-bold text-slate-900 mb-4">Licenses Expiring Soon</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Driver Name</th>
                <th className="pb-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">License No.</th>
                <th className="pb-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Expiry Date</th>
                <th className="pb-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold text-right">Days Remaining</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { name: 'Amit Sharma', lic: 'DL-1420110012345', date: '15 Jul 2024', days: 3, alert: true },
                { name: 'Rajesh Kumar', lic: 'UP-3220150098765', date: '20 Jul 2024', days: 8, alert: true },
                { name: 'Suresh Singh', lic: 'HR-2620180054321', date: '05 Aug 2024', days: 24, alert: false },
                { name: 'Vikram Patel', lic: 'GJ-0120190011223', date: '12 Aug 2024', days: 31, alert: false },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-bold text-slate-800 flex items-center gap-2">
                    {row.alert && <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
                    {row.name}
                  </td>
                  <td className="py-3 text-slate-500 font-medium font-mono text-xs">{row.lic}</td>
                  <td className="py-3 text-slate-600 font-semibold">{row.date}</td>
                  <td className="py-3 text-right">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${row.alert ? 'text-red-700 bg-red-100' : 'text-slate-600 bg-slate-100'}`}>
                      {row.days} days
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
