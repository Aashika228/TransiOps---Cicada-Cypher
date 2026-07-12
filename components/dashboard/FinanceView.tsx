'use client'

import { AlertCircle, AlertTriangle } from 'lucide-react'

export function FinanceView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-extrabold text-slate-900">Financial Analyst</h2>
        <div className="flex items-center gap-2">
          <select className="text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-1.5 outline-none">
            <option>Last 30 Days</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      {/* Operational Cost Trend (Line Chart pseudo) */}
      <div className="premium-card rounded-2xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-slate-900">Operational Cost Trend</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span className="text-[10px] font-bold text-slate-500 uppercase">Fuel</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-violet-500" /><span className="text-[10px] font-bold text-slate-500 uppercase">Maintenance</span></div>
          </div>
        </div>
        <div className="h-48 relative flex items-end justify-between px-2 pb-6">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
            {[100, 75, 50, 25, 0].map(y => (
              <div key={y} className="flex items-center w-full">
                <span className="text-[9px] text-slate-300 w-8">₹{y}k</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
            ))}
          </div>
          
          {[
            { d: 'Week 1', f: 65, m: 20 },
            { d: 'Week 2', f: 72, m: 15 },
            { d: 'Week 3', f: 68, m: 45 },
            { d: 'Week 4', f: 85, m: 25 },
          ].map((w, i) => (
            <div key={i} className="relative flex justify-center flex-1 h-full items-end gap-1 group">
              <div className="w-8 rounded-t-sm bg-amber-500 transition-all duration-300 group-hover:opacity-80" style={{ height: `${w.f}%` }} />
              <div className="w-8 rounded-t-sm bg-violet-500 transition-all duration-300 group-hover:opacity-80" style={{ height: `${w.m}%` }} />
              <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400">{w.d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Cost Breakdown by Vehicle (Horizontal Bar) */}
        <div className="premium-card rounded-2xl p-6 lg:col-span-1">
          <h3 className="font-bold text-slate-900 mb-6">Highest Cost Vehicles</h3>
          <div className="space-y-4">
            {[
              { v: 'MH-04-1111', cost: '₹1,24k', p: 90 },
              { v: 'DL-01-2222', cost: '₹1,18k', p: 85 },
              { v: 'KA-03-3333', cost: '₹98k', p: 70 },
              { v: 'UP-32-5555', cost: '₹85k', p: 60 },
              { v: 'TN-02-4444', cost: '₹72k', p: 50 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">{item.v}</span>
                  <span className="text-rose-600">{item.cost}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${item.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fuel Efficiency Comparison (Bar chart) */}
        <div className="premium-card rounded-2xl p-6 lg:col-span-1 flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6">Fuel Efficiency (km/L)</h3>
          <div className="flex-1 relative flex items-end justify-between px-2 pb-6">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              {[8, 6, 4, 2, 0].map(y => (
                <div key={y} className="flex items-center w-full">
                  <span className="text-[9px] text-slate-300 w-4">{y}</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
              ))}
            </div>
            {[
              { v: 'V1', val: 5.2 }, { v: 'V2', val: 6.8 }, { v: 'V3', val: 4.1 }, { v: 'V4', val: 7.2 }, { v: 'V5', val: 5.9 }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center flex-1 mx-1 h-full justify-end group">
                <div className={`w-full max-w-[24px] rounded-t-sm transition-all duration-300 ${item.val < 5 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ height: `${(item.val / 8) * 100}%` }} />
                <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400">{item.v}</span>
                <span className="absolute -top-5 text-[10px] font-black text-slate-700 opacity-0 group-hover:opacity-100">{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle ROI (Bar chart pos/neg) */}
        <div className="premium-card rounded-2xl p-6 lg:col-span-1 flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6">Vehicle ROI (%)</h3>
          <div className="flex-1 relative flex items-center justify-between px-2">
            {/* Center Zero Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300" />
            
            {[
              { v: 'V1', val: 12 }, { v: 'V2', val: 24 }, { v: 'V3', val: -8 }, { v: 'V4', val: 5 }, { v: 'V5', val: -15 }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center flex-1 mx-1 h-full justify-center group">
                <div className="absolute top-1/2 flex flex-col items-center w-full max-w-[24px]">
                  {item.val > 0 ? (
                    <div className="w-full bg-emerald-500 rounded-t-sm absolute bottom-0" style={{ height: `${item.val * 3}px` }} />
                  ) : (
                    <div className="w-full bg-red-500 rounded-b-sm absolute top-0" style={{ height: `${Math.abs(item.val) * 3}px` }} />
                  )}
                </div>
                <span className="absolute bottom-4 text-[10px] font-bold text-slate-400">{item.v}</span>
                <span className={`absolute ${item.val > 0 ? 'top-10' : 'bottom-10'} text-[10px] font-black ${item.val > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{item.val}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Expense Anomalies Table */}
      <div className="premium-card rounded-2xl p-6 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900">Expense Anomalies (Flagged)</h3>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Vehicle</th>
                <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Date</th>
                <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Type</th>
                <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Amount</th>
                <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Flagged Reason</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { v: 'MH-04-1111', date: 'Today, 09:12 AM', type: 'Fuel', amount: '₹14,500', reason: 'Refuel volume exceeds tank capacity' },
                { v: 'DL-01-2222', date: 'Yesterday', type: 'Maintenance', amount: '₹45,000', reason: 'Unscheduled repair > ₹20k' },
                { v: 'UP-32-5555', date: '10 Jul 2024', type: 'Toll', amount: '₹2,400', reason: 'Route mismatch' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 font-bold text-slate-800">{row.v}</td>
                  <td className="py-2.5 text-slate-500 font-medium">{row.date}</td>
                  <td className="py-2.5 text-slate-600 font-semibold">{row.type}</td>
                  <td className="py-2.5 text-rose-600 font-bold">{row.amount}</td>
                  <td className="py-2.5 flex items-center gap-2 text-slate-600 font-medium text-xs">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                    {row.reason}
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
