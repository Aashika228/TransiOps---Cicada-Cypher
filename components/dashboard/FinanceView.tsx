'use client'

import { AlertCircle, AlertTriangle, FileText, Download, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function FinanceView() {
  const [showReport, setShowReport] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    fetch('/api/vehicles').then(r => r.json()).then(data => {
      if(Array.isArray(data)) setVehicles(data);
    });
  }, []);

  useEffect(() => {
    if(selectedVehicleId) {
      setLoadingReport(true);
      fetch(`/api/expenses?vehicleId=${selectedVehicleId}`)
        .then(r => r.json())
        .then(data => {
          if(Array.isArray(data)) setExpenses(data);
        })
        .finally(() => setLoadingReport(false));
    }
  }, [selectedVehicleId]);

  const handleExportPDF = () => {
    const element = document.getElementById('expense-report-content');
    if (!element) return;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;
    
    const headContent = document.head.innerHTML;
    const vehicleName = vehicles.find(v => v._id === selectedVehicleId)?.registrationNumber || 'Report';
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Expense Audit - ${vehicleName}</title>
          ${headContent}
          <style>
            body { padding: 40px !important; background: white !important; }
            #expense-report-content { box-shadow: none !important; border: none !important; margin: 0 !important; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${element.outerHTML}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-extrabold text-slate-900 dark:text-slate-50">Financial Analyst</h2>
        <div className="flex items-center gap-2">
          <select className="text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 outline-none">
            <option>Last 30 Days</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      {/* Operational Cost Trend (Line Chart pseudo) */}
      <div className="premium-card rounded-2xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-slate-900 dark:text-slate-50">Operational Cost Trend</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase">Fuel</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-violet-500" /><span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase">Maintenance</span></div>
          </div>
        </div>
        <div className="h-48 relative flex items-end justify-between px-2 pb-6">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
            {[100, 75, 50, 25, 0].map(y => (
              <div key={y} className="flex items-center w-full">
                <span className="text-[9px] text-slate-300 w-8">₹{y}k</span>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800/80" />
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
              <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 dark:text-slate-500">{w.d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Cost Breakdown by Vehicle (Horizontal Bar) */}
        <div className="premium-card rounded-2xl p-6 lg:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 dark:text-slate-50">Highest Cost Vehicles</h3>
            <button onClick={() => setShowReport(true)} className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded hover:bg-emerald-100 transition-colors">
              <FileText className="h-3 w-3" />
              Auto Report
            </button>
          </div>
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
                  <span className="text-slate-700 dark:text-slate-300">{item.v}</span>
                  <span className="text-rose-600">{item.cost}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${item.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fuel Efficiency Comparison (Bar chart) */}
        <div className="premium-card rounded-2xl p-6 lg:col-span-1 flex flex-col">
          <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-6">Fuel Efficiency (km/L)</h3>
          <div className="flex-1 relative flex items-end justify-between px-2 pb-6">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              {[8, 6, 4, 2, 0].map(y => (
                <div key={y} className="flex items-center w-full">
                  <span className="text-[9px] text-slate-300 w-4">{y}</span>
                  <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800/80" />
                </div>
              ))}
            </div>
            {[
              { v: 'V1', val: 5.2 }, { v: 'V2', val: 6.8 }, { v: 'V3', val: 4.1 }, { v: 'V4', val: 7.2 }, { v: 'V5', val: 5.9 }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center flex-1 mx-1 h-full justify-end group">
                <div className={`w-full max-w-[24px] rounded-t-sm transition-all duration-300 ${item.val < 5 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ height: `${(item.val / 8) * 100}%` }} />
                <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 dark:text-slate-500">{item.v}</span>
                <span className="absolute -top-5 text-[10px] font-black text-slate-700 dark:text-slate-300 opacity-0 group-hover:opacity-100">{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle ROI (Bar chart pos/neg) */}
        <div className="premium-card rounded-2xl p-6 lg:col-span-1 flex flex-col">
          <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-6">Vehicle ROI (%)</h3>
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
                <span className="absolute bottom-4 text-[10px] font-bold text-slate-400 dark:text-slate-500">{item.v}</span>
                <span className={`absolute ${item.val > 0 ? 'top-10' : 'bottom-10'} text-[10px] font-black ${item.val > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{item.val}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Expense Anomalies Table */}
      <div className="premium-card rounded-2xl p-6 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-50">Expense Anomalies (Flagged)</h3>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Vehicle</th>
                <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Date</th>
                <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Type</th>
                <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Amount</th>
                <th className="pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Flagged Reason</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { v: 'MH-04-1111', date: 'Today, 09:12 AM', type: 'Fuel', amount: '₹14,500', reason: 'Refuel volume exceeds tank capacity' },
                { v: 'DL-01-2222', date: 'Yesterday', type: 'Maintenance', amount: '₹45,000', reason: 'Unscheduled repair > ₹20k' },
                { v: 'UP-32-5555', date: '10 Jul 2024', type: 'Toll', amount: '₹2,400', reason: 'Route mismatch' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 dark:bg-slate-800 transition-colors">
                  <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">{row.v}</td>
                  <td className="py-2.5 text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">{row.date}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-400 dark:text-slate-500 font-semibold">{row.type}</td>
                  <td className="py-2.5 text-rose-600 font-bold">{row.amount}</td>
                  <td className="py-2.5 flex items-center gap-2 text-slate-600 dark:text-slate-400 dark:text-slate-500 font-medium text-xs">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                    {row.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-none w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">Individual Vehicle Expense Report</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Generate automated audit report</p>
                </div>
              </div>
              <button 
                onClick={() => setShowReport(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 dark:text-slate-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Select Vehicle</label>
                  <select 
                    value={selectedVehicleId} 
                    onChange={e => setSelectedVehicleId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 outline-none focus:border-emerald-500"
                  >
                    <option value="">-- Choose a Vehicle --</option>
                    {vehicles.map(v => (
                      <option key={v._id} value={v._id}>{v.registrationNumber} ({v.name})</option>
                    ))}
                  </select>
                </div>
                <button onClick={handleExportPDF} disabled={!selectedVehicleId || expenses.length === 0} className="mt-5 flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Download className="h-4 w-4" />
                  Export PDF
                </button>
              </div>

              {selectedVehicleId && (
                <div id="expense-report-content" className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900 shadow-sm dark:shadow-none">
                  <div className="text-center mb-6 border-b border-dashed pb-6">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-widest">Expense Audit</h2>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Vehicle: {vehicles.find(v => v._id === selectedVehicleId)?.registrationNumber}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Generated: {new Date().toLocaleString()}</p>
                  </div>

                  {loadingReport ? (
                    <div className="text-center py-10 text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold">Loading records...</div>
                  ) : expenses.length === 0 ? (
                    <div className="text-center py-10">
                      <div className="inline-flex w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800/80 items-center justify-center mb-3">
                        <AlertCircle className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold">No expenses recorded for this vehicle.</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Add expenses via the Fuel & Exp tab.</p>
                    </div>
                  ) : (
                    <>
                      <table className="w-full text-left mb-6">
                        <thead>
                          <tr className="border-b-2 border-slate-900">
                            <th className="py-2 text-xs font-black uppercase text-slate-900 dark:text-slate-50">Date</th>
                            <th className="py-2 text-xs font-black uppercase text-slate-900 dark:text-slate-50">Type</th>
                            <th className="py-2 text-xs font-black uppercase text-slate-900 dark:text-slate-50 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expenses.map((e, i) => (
                            <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                              <td className="py-3 text-sm font-medium text-slate-600 dark:text-slate-400 dark:text-slate-500">{new Date(e.date).toLocaleDateString()}</td>
                              <td className="py-3 text-sm font-bold text-slate-800 dark:text-slate-200">{e.type}</td>
                              <td className="py-3 text-sm font-black text-rose-600 text-right">₹{e.cost.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 border-slate-900 bg-slate-50 dark:bg-slate-800">
                            <td colSpan={2} className="py-4 text-right text-sm font-black text-slate-900 dark:text-slate-50">TOTAL EXPENSES</td>
                            <td className="py-4 text-lg font-black text-rose-600 text-right">₹{expenses.reduce((sum, e) => sum + e.cost, 0).toLocaleString()}</td>
                          </tr>
                        </tfoot>
                      </table>
                      <div className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-8">
                        *** End of Report ***
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
