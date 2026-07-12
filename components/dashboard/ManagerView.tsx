'use client'

import { AlertCircle, BarChart3, Settings } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function ManagerView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-extrabold text-slate-900 dark:text-slate-50">Fleet Manager Overview</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Vehicle Status Breakdown - Donut Chart */}
        <div className="premium-card rounded-2xl p-6 relative overflow-hidden">
          <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-6">Vehicle Status</h3>
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
              <span className="text-3xl font-black text-slate-900 dark:text-slate-50">142</span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500" /><span className="text-xs font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">Available (38)</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-sky-500" /><span className="text-xs font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">On Trip (92)</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-500" /><span className="text-xs font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">In Shop (12)</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" /><span className="text-xs font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">Retired (15)</span></div>
          </div>
        </div>

        {/* Fleet Utilization Trend - Line Chart */}
        <div className="premium-card rounded-2xl p-6 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 dark:text-slate-50">Fleet Utilization Trend (Last 7 Days)</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-md">+4.2%</span>
          </div>
          <div className="flex-1 w-full h-[250px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { day: 'Mon', val: 55 }, { day: 'Tue', val: 62 }, { day: 'Wed', val: 60 },
                  { day: 'Thu', val: 68 }, { day: 'Fri', val: 74 }, { day: 'Sat', val: 82 }, { day: 'Sun', val: 64 }
                ]}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Top 5 Vehicles - Horizontal Bar */}
        <div className="premium-card rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-6">Top 5 Highly Utilized Vehicles</h3>
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
                  <span className="text-slate-700 dark:text-slate-300">{v.name}</span>
                  <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500">{v.trips} trips</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${(v.trips / v.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Alerts - Table */}
        <div className="premium-card rounded-2xl p-6 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-50">Maintenance Alerts</h3>
            <button className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:text-slate-50 transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Vehicle</th>
                  <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Last Service</th>
                  <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Km Since</th>
                  <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { v: 'MH-12-AB-9012', last: '12 Jan 2024', km: '14,200', status: 'Due Soon', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30' },
                  { v: 'DL-01-XY-8877', last: '04 Mar 2024', km: '21,500', status: 'Critical', color: 'text-red-600 bg-red-50 dark:bg-red-950/30' },
                  { v: 'KA-05-PQ-3344', last: '22 Feb 2024', km: '8,400', status: 'OK', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' },
                  { v: 'TN-10-LM-5566', last: '15 Jan 2024', km: '13,800', status: 'Due Soon', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 dark:bg-slate-800 transition-colors">
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">{row.v}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">{row.last}</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400 dark:text-slate-500 font-semibold">{row.km}</td>
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
