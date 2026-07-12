'use client'

import { Plus, Search, Wrench, MoreHorizontal, Calendar, Info } from 'lucide-react'

export function MaintenanceLog() {
  const records = [
    { v: 'MH-04-AB-1234', date: '11 Jul 2024', desc: 'Engine oil replacement & filter change', cost: '₹12,500', status: 'Completed', statusColor: 'bg-emerald-100 text-emerald-700' },
    { v: 'DL-01-XY-9876', date: '08 Jul 2024', desc: 'Brake pad replacement (All wheels)', cost: '₹28,000', status: 'Completed', statusColor: 'bg-emerald-100 text-emerald-700' },
    { v: 'KA-05-PQ-3344', date: 'Today, 09:00 AM', desc: 'Transmission fluid leak repair', cost: 'Pending', status: 'In Shop', statusColor: 'bg-red-100 text-red-700' },
    { v: 'TN-10-LM-5566', date: 'Scheduled: 15 Jul', desc: 'Routine 50,000km full inspection', cost: 'Estimate: ₹8,000', status: 'Scheduled', statusColor: 'bg-amber-100 text-amber-700' },
  ]

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

          <form className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Vehicle</label>
              <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors">
                <option>Select Vehicle</option>
                <option>MH-04-AB-1234 (Available)</option>
                <option>KA-05-PQ-3344 (Available)</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Service Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="date" className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Description of Work</label>
              <textarea placeholder="Describe the maintenance..." rows={3} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors resize-none" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Cost (₹)</label>
              <input type="number" placeholder="0.00" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" />
            </div>

            <button type="button" className="w-full mt-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
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
                {records.map((r, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-4 font-bold text-slate-800 font-mono text-xs flex items-center gap-2">
                      <Wrench className="h-3.5 w-3.5 text-slate-400" />
                      {r.v}
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-medium text-xs">{r.date}</td>
                    <td className="px-4 py-4 text-slate-700 font-medium">{r.desc}</td>
                    <td className="px-4 py-4 text-slate-900 font-bold">{r.cost}</td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${r.statusColor}`}>{r.status}</span>
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
