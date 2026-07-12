'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Compass, Settings, LogOut, Bell, Search, Truck, Briefcase, ShieldCheck, Landmark } from 'lucide-react'
import { DriverView } from '@/components/dashboard/DriverView'
import { ManagerView } from '@/components/dashboard/ManagerView'
import { SafetyView } from '@/components/dashboard/SafetyView'
import { FinanceView } from '@/components/dashboard/FinanceView'
import { SharedKPIs } from '@/components/dashboard/SharedKPIs'
import { VehicleRegistry } from '@/components/dashboard/VehicleRegistry'
import { DriverManagement } from '@/components/dashboard/DriverManagement'
import { TripManagement } from '@/components/dashboard/TripManagement'
import { MaintenanceLog } from '@/components/dashboard/MaintenanceLog'
import { ExpenseManagement } from '@/components/dashboard/ExpenseManagement'

function DashboardContent() {
  const searchParams = useSearchParams()
  const roleParam = searchParams.get('role') || 'fleet-manager'
  const viewParam = searchParams.get('view') || 'dashboard'
  
  // Format role name for display
  const roleDisplay = roleParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  
  const renderView = () => {
    // If we are looking at a management module
    switch (viewParam) {
      case 'vehicles': return <VehicleRegistry />
      case 'drivers': return <DriverManagement />
      case 'trips': return <TripManagement />
      case 'maintenance': return <MaintenanceLog />
      case 'expenses': return <ExpenseManagement />
    }

    // Default dashboard views
    switch (roleParam) {
      case 'driver': return <DriverView />
      case 'fleet-manager': return <ManagerView />
      case 'safety-officer': return <SafetyView />
      case 'finance': return <FinanceView />
      default: return <ManagerView />
    }
  }

  // Sidebar link config depending on role
  const getNavLinks = () => {
    const base = [
      { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    ]
    if (roleParam === 'driver') {
      base.push({ name: 'Trips', icon: Compass, id: 'trips' })
    } else if (roleParam === 'fleet-manager') {
      base.push({ name: 'Vehicles', icon: Truck, id: 'vehicles' })
      base.push({ name: 'Drivers', icon: Briefcase, id: 'drivers' })
      base.push({ name: 'Trips', icon: Compass, id: 'trips' })
      base.push({ name: 'Maintenance', icon: Settings, id: 'maintenance' })
      base.push({ name: 'Fuel & Exp', icon: Landmark, id: 'expenses' })
    } else if (roleParam === 'safety-officer') {
      base.push({ name: 'Drivers', icon: Briefcase, id: 'drivers' })
    } else if (roleParam === 'finance') {
      base.push({ name: 'Fuel & Exp', icon: Landmark, id: 'expenses' })
    }
    
    return base.map(link => ({
      ...link,
      href: `/dashboard?role=${roleParam}&view=${link.id}`,
      active: viewParam === link.id
    }))
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-6"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 14px rgba(16,185,129,0.35)' }}>
              <span className="text-white font-black text-sm leading-none">V</span>
            </div>
            <span className="font-display font-extrabold text-lg text-slate-900 tracking-tight">Vahan Saarthi</span>
          </Link>
        </div>
        
        <div className="p-4 flex-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">Menu</p>
          <nav className="space-y-1">
            {getNavLinks().map((link) => {
              const Icon = link.icon
              return (
                <Link key={link.name} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${link.active ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                  <Icon className={`h-4 w-4 ${link.active ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-100">
          <Link href="/auth" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="h-4 w-4 text-slate-400 group-hover:text-red-500" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors">
              <Bell className="h-4 w-4 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-100" />
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-tight">Demo User</p>
                <p className="text-[10px] font-semibold text-slate-500 uppercase">{roleDisplay}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-sm">
                DU
              </div>
            </div>
          </div>
        </header>
        
        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            {viewParam === 'dashboard' && <SharedKPIs />}
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" /></div>}>
      <DashboardContent />
    </Suspense>
  )
}
