'use client'

import { Plus, Search, Truck, MoreHorizontal } from 'lucide-react'

export function VehicleRegistry() {
  const vehicles = [
    { reg: 'MH-04-AB-1234', name: 'Volvo FH-16', type: 'Heavy Duty', load: '40 Tons', odo: '142,500 km', cost: '₹85,00,000', status: 'Available', statusColor: 'bg-emerald-100 text-emerald-700' },
    { reg: 'DL-01-XY-9876', name: 'Tata Prima', type: 'Medium Duty', load: '25 Tons', odo: '89,200 km', cost: '₹45,00,000', status: 'On Trip', statusColor: 'bg-blue-100 text-blue-700' },
    { reg: 'KA-05-PQ-3344', name: 'Scania R-Series', type: 'Heavy Duty', load: '40 Tons', odo: '215,000 km', cost: '₹92,00,000', status: 'In Shop', statusColor: 'bg-red-100 text-red-700' },
    { reg: 'TN-10-LM-5566', name: 'Ashok Leyland', type: 'Light Duty', load: '10 Tons', odo: '45,800 km', cost: '₹18,00,000', status: 'Available', statusColor: 'bg-emerald-100 text-emerald-700' },
    { reg: 'UP-32-EF-9012', name: 'BharatBenz', type: 'Medium Duty', load: '25 Tons', odo: '1,12,000 km', cost: '₹42,00,000', status: 'On Trip', statusColor: 'bg-blue-100 text-blue-700' },
    { reg: 'GJ-01-AB-1122', name: 'Eicher Pro', type: 'Light Duty', load: '8 Tons', odo: '450,000 km', cost: '₹15,00,000', status: 'Retired', statusColor: 'bg-slate-200 text-slate-700' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-900">Vehicle Registry</h2>
          <p className="text-sm text-slate-500 font-medium">Manage master list of all fleet vehicles.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </button>
      </div>

      <div className="premium-card rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search by registration or name..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-emerald-500 outline-none transition-colors" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="flex-1 sm:flex-none text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none">
              <option>All Types</option>
              <option>Heavy Duty</option>
              <option>Medium Duty</option>
              <option>Light Duty</option>
            </select>
            <select className="flex-1 sm:flex-none text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none">
              <option>All Statuses</option>
              <option>Available</option>
              <option>On Trip</option>
              <option>In Shop</option>
              <option>Retired</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Registration No.</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Name/Model</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Type</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Max Load</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Odometer</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Cost</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-right">Status</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {vehicles.map((v, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-800 font-mono text-xs flex items-center gap-2">
                    <Truck className="h-4 w-4 text-slate-400" />
                    {v.reg}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">{v.name}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{v.type}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{v.load}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{v.odo}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{v.cost}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${v.statusColor}`}>{v.status}</span>
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
    </div>
  )
}
