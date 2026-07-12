'use client'

import { Plus, Search, FileText, Download } from 'lucide-react'

export function ExpenseManagement() {
  const expenses = [
    { v: 'MH-04-AB-1234', date: 'Today, 08:30 AM', type: 'Fuel', liters: '120 L', cost: '₹11,400', color: 'text-amber-700 bg-amber-50' },
    { v: 'DL-01-XY-9876', date: 'Yesterday, 14:15 PM', type: 'Toll', liters: '-', cost: '₹850', color: 'text-violet-700 bg-violet-50' },
    { v: 'KA-05-PQ-3344', date: '10 Jul 2024', type: 'Maintenance', liters: '-', cost: '₹28,000', color: 'text-emerald-700 bg-emerald-50' },
    { v: 'TN-10-LM-5566', date: '09 Jul 2024', type: 'Fuel', liters: '85 L', cost: '₹8,075', color: 'text-amber-700 bg-amber-50' },
    { v: 'MH-04-AB-1234', date: '08 Jul 2024', type: 'Toll', liters: '-', cost: '₹1,200', color: 'text-violet-700 bg-violet-50' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-900">Fuel & Expense Management</h2>
          <p className="text-sm text-slate-500 font-medium">Record fuel logs and calculate total operational costs.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
          <Plus className="h-4 w-4" />
          Log Expense
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        
        {/* Cost Summary Cards */}
        <div className="lg:col-span-4 grid grid-cols-3 gap-6">
          <div className="premium-card p-5 rounded-2xl flex items-center justify-between border border-amber-100 bg-amber-50/30">
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Total Fuel (30 Days)</p>
              <p className="text-3xl font-display font-black text-slate-900">₹8,45,200</p>
            </div>
          </div>
          <div className="premium-card p-5 rounded-2xl flex items-center justify-between border border-violet-100 bg-violet-50/30">
            <div>
              <p className="text-xs font-bold text-violet-700 uppercase tracking-wide mb-1">Total Tolls & Other (30 Days)</p>
              <p className="text-3xl font-display font-black text-slate-900">₹1,12,500</p>
            </div>
          </div>
          <div className="premium-card p-5 rounded-2xl flex items-center justify-between border border-slate-200 bg-slate-900 text-white">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Total Op. Cost (Fuel + Maint.)</p>
              <p className="text-3xl font-display font-black">₹11,85,700</p>
            </div>
          </div>
        </div>

        {/* Expense Log Table */}
        <div className="premium-card rounded-2xl overflow-hidden flex flex-col lg:col-span-4">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Expense Log</h3>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Search vehicle or type..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-emerald-500 outline-none transition-colors" />
              </div>
              <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Date & Time</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Vehicle</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Type</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-right">Liters (Fuel)</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-right">Total Cost</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {expenses.map((e, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-slate-500 font-medium text-xs">{e.date}</td>
                    <td className="px-6 py-4 font-bold text-slate-800 font-mono text-xs">{e.v}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${e.color}`}>{e.type}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600 font-medium">{e.liters}</td>
                    <td className="px-6 py-4 text-right text-slate-900 font-bold">{e.cost}</td>
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
