'use client'

import { useState, useEffect } from 'react'
import { Truck, CheckCircle, Wrench, Compass, FileText, Users, Percent } from 'lucide-react'

export function SharedKPIs() {
  const [data, setData] = useState({
    activeVehicles: '0',
    availableVehicles: '0',
    maintenanceVehicles: '0',
    activeTrips: '0',
    pendingTrips: '0',
    driversOnDuty: '0',
    utilization: '0%'
  })

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => {
        if (!d.error) setData(d)
      })
      .catch(console.error)
  }, [])

  const kpis = [
    { label: 'Active Vehicles', value: data.activeVehicles, icon: Truck, color: 'text-slate-700', bg: 'bg-slate-100' },
    { label: 'Available', value: data.availableVehicles, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'In Maintenance', value: data.maintenanceVehicles, icon: Wrench, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Active Trips', value: data.activeTrips, icon: Compass, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Trips', value: data.pendingTrips, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Drivers On Duty', value: data.driversOnDuty, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Utilization', value: data.utilization, icon: Percent, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-sm font-extrabold text-slate-500 uppercase tracking-widest mb-3">Live Fleet Status</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="premium-card p-3 rounded-2xl flex flex-col justify-between h-24">
              <div className="flex justify-between items-start">
                <p className="text-[10px] font-bold text-slate-500 leading-tight pr-2">{kpi.label}</p>
                <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${kpi.bg}`}>
                  <Icon className={`h-3 w-3 ${kpi.color}`} />
                </div>
              </div>
              <p className="font-display text-2xl font-black text-slate-900">{kpi.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
