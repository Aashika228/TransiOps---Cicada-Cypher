'use client'

import { useState } from 'react'
import { Truck, Users, MapPin, Wrench, Zap, BarChart3, Lock, FileDown, ArrowRight, CheckCircle2 } from 'lucide-react'

const featureTabs = [
  { id: 'fleet', label: 'Fleet', icon: Truck, title: 'Centralized Fleet Control', description: 'Manage your entire vehicle fleet in one unified dashboard. Track real-time status, maintenance schedules, and utilization metrics.', bullets: ['Complete vehicle registry with specifications', 'Live vehicle status and location tracking', 'Automated maintenance alerts and scheduling', 'Fleet utilization and performance metrics'], color: '#10b981', preview: 'fleet-dashboard' },
  { id: 'driver', label: 'Drivers', icon: Users, title: 'Comprehensive Driver Oversight', description: 'Manage driver profiles, licenses, availability, and performance. Keep track of safety scores and training records.', bullets: ['Driver profile and license management', 'Automatic license expiry notifications', 'Real-time availability and assignments', 'Safety scoring and performance tracking'], color: '#06b6d4', preview: 'driver-dashboard' },
  { id: 'dispatch', label: 'Dispatch', icon: MapPin, title: 'Smart Route Optimization', description: 'Intelligent dispatch system with route optimization, driver availability validation, and real-time tracking.', bullets: ['Interactive route mapping and optimization', 'Automatic driver and vehicle assignment', 'Smart conflict and availability validation', 'Live trip tracking and notifications'], color: '#8b5cf6', preview: 'dispatch-dashboard' },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench, title: 'Preventive Maintenance', description: 'Track maintenance schedules, service records, and vehicle health. Never miss a maintenance deadline.', bullets: ['Maintenance timeline and history tracking', 'Complete service records and documentation', 'Upcoming maintenance reminders', 'Vehicle health status monitoring'], color: '#f59e0b', preview: 'maintenance-dashboard' },
  { id: 'fuel', label: 'Fuel & Costs', icon: Zap, title: 'Cost Optimization', description: 'Track fuel consumption, operating costs, and efficiency metrics. Identify savings opportunities across your fleet.', bullets: ['Detailed fuel consumption logs and trends', 'Expense breakdown by vehicle and trip', 'Cost analytics and budget tracking', 'Fuel efficiency metrics and insights'], color: '#f97316', preview: 'fuel-dashboard' },
  { id: 'reports', label: 'Analytics', icon: BarChart3, title: 'Business Intelligence', description: 'Advanced analytics and reporting with KPIs, revenue tracking, and operational insights for data-driven decisions.', bullets: ['Customizable KPI dashboards and metrics', 'Fleet utilization and revenue analytics', 'Operational efficiency reports', 'ROI and profitability tracking'], color: '#ec4899', preview: 'reports-dashboard' },
  { id: 'access', label: 'Access', icon: Lock, title: 'Secure Permission System', description: 'Multi-role support with granular permissions. Ensure data security with role-based access control.', bullets: ['Multiple user roles and permission levels', 'Admin, Manager, and Driver dashboards', 'Secure authentication and session management', 'Audit logs and activity tracking'], color: '#64748b', preview: 'access-dashboard' },
  { id: 'export', label: 'Export', icon: FileDown, title: 'Data Export', description: 'Generate and export comprehensive reports in CSV and PDF formats for compliance and analysis.', bullets: ['CSV and PDF export capabilities', 'Scheduled report generation and delivery', 'Custom report builder and templates', 'Compliance-ready documentation'], color: '#3b82f6', preview: 'export-dashboard' },
]

const allStats: Record<string, { labels: string[]; values: string[]; colors: (string|undefined)[] }> = {
  'fleet-dashboard':       { labels: ['Total Vehicles','Active Now','Maintenance Due','Fleet Health'],  values: ['1,254','892','48','94%'],       colors: ['#1e293b','#10b981','#f59e0b','#1e293b'] },
  'driver-dashboard':      { labels: ['Total Drivers','Available','License Expires','Avg Safety'],      values: ['487','412','12','8.7/10'],       colors: ['#1e293b','#06b6d4','#f59e0b','#1e293b'] },
  'dispatch-dashboard':    { labels: ['Dispatches Today','Completed','In Progress','On-time Rate'],     values: ['243','156','71','96%'],           colors: ['#1e293b','#8b5cf6','#3b82f6','#8b5cf6'] },
  'maintenance-dashboard': { labels: ['Service Records','Due Soon','Overdue','Compliance'],             values: ['1,842','34','2','99%'],           colors: ['#1e293b','#f59e0b','#ef4444','#10b981'] },
  'fuel-dashboard':        { labels: ['Total Fuel Cost','Avg Efficiency','Total Litres','Savings'],     values: ['₹24.5L','6.8 km/L','3.6M','₹2.1L'], colors: ['#1e293b','#f97316','#3b82f6','#10b981'] },
  'reports-dashboard':     { labels: ['Total Revenue','Utilization','ROI','Daily Revenue'],             values: ['₹145.2L','87%','38%','₹39.8K'],  colors: ['#1e293b','#ec4899','#10b981','#1e293b'] },
  'access-dashboard':      { labels: ['Total Users','Admins','Managers','Drivers'],                    values: ['126','3','12','111'],             colors: ['#1e293b','#1e293b','#3b82f6','#64748b'] },
  'export-dashboard':      { labels: ['Reports Generated','CSV Exports','PDF Reports','This Month'],   values: ['342','218','124','47'],           colors: ['#1e293b','#10b981','#3b82f6','#1e293b'] },
}

const allActivity: Record<string, { label: string; value: string; ok: boolean }[]> = {
  'fleet-dashboard':       [{ label: 'Route-101: Delhi → Mumbai', value: 'On Schedule', ok: true }, { label: 'Route-045: Bangalore → Chennai', value: 'On Schedule', ok: true }, { label: 'Route-089: Hyderabad → Pune', value: 'Delayed 15min', ok: false }],
  'driver-dashboard':      [{ label: 'Rajesh Kumar', value: '9.8/10', ok: true }, { label: 'Priya Singh', value: '9.5/10', ok: true }, { label: 'Amit Patel', value: '9.2/10', ok: true }],
  'dispatch-dashboard':    [{ label: 'Dispatch #1042', value: 'Completed', ok: true }, { label: 'Dispatch #1043', value: 'In Progress', ok: true }, { label: 'Dispatch #1044', value: 'Scheduled', ok: false }],
  'maintenance-dashboard': [{ label: 'VEH-001: Oil Change', value: '2 days', ok: false }, { label: 'VEH-015: Tire Rotation', value: '5 days', ok: false }, { label: 'VEH-042: Brake Inspect', value: '7 days', ok: false }],
  'fuel-dashboard':        [{ label: 'Diesel', value: '₹19.2L (78%)', ok: true }, { label: 'Petrol', value: '₹5.3L (22%)', ok: true }, { label: 'Savings Identified', value: '₹2.1L', ok: true }],
  'reports-dashboard':     [{ label: 'Revenue vs Target', value: '+12.4%', ok: true }, { label: 'Cost per KM', value: '₹4.2', ok: true }, { label: 'Idle Time', value: '3.2%', ok: true }],
  'access-dashboard':      [{ label: 'View Dashboard', value: 'All Roles', ok: true }, { label: 'Manage Users', value: 'Admin', ok: true }, { label: 'Edit Reports', value: 'Manager+', ok: true }],
  'export-dashboard':      [{ label: 'Fleet_Report_Dec2024.pdf', value: '2.4 MB', ok: true }, { label: 'Driver_Safety_Scores.csv', value: '156 KB', ok: true }, { label: 'Monthly_Revenue.xlsx', value: '892 KB', ok: true }],
}

function DashboardPreview({ previewType, color }: { previewType: string; color: string }) {
  const data = allStats[previewType] || allStats['fleet-dashboard']
  const activity = allActivity[previewType] || allActivity['fleet-dashboard']

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {data.labels.map((label, i) => (
          <div key={label} className="rounded-lg p-3" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
            <div className="text-xs text-slate-500 mb-1">{label}</div>
            <div className="text-lg font-bold" style={{ color: data.colors[i] || color }}>{data.values[i]}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg p-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <div className="text-xs font-semibold text-slate-600 mb-2">Latest Activity</div>
        <div className="space-y-1.5">
          {activity.map((item) => (
            <div key={item.label} className="flex justify-between items-center text-xs">
              <span className="text-slate-500 truncate max-w-[60%]">{item.label}</span>
              <span className="font-semibold" style={{ color: item.ok ? color : '#f59e0b' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Features() {
  const [activeTab, setActiveTab] = useState('fleet')
  const activeFeature = featureTabs.find((tab) => tab.id === activeTab)!

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)', filter: 'blur(30px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Platform Features</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Powerful Tools for
            <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Modern Fleet Operations
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Explore each module to see how Vahan Saarthi transforms fleet management.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {featureTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300"
                style={isActive
                  ? { background: `linear-gradient(135deg, ${tab.color}, ${tab.color}cc)`, color: 'white', boxShadow: `0 4px 20px ${tab.color}35`, transform: 'translateY(-1px)' }
                  : { background: 'white', color: '#475569', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }
                }
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div key={activeTab} className="grid lg:grid-cols-[45%_55%] gap-10 items-center" style={{ animation: 'slide-up-fade 0.4s ease-out' }}>
          {/* Left */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: `${activeFeature.color}12`, border: `1px solid ${activeFeature.color}30`, color: activeFeature.color }}>
                Feature Module
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">{activeFeature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-lg">{activeFeature.description}</p>
            </div>
            <div className="space-y-3">
              {activeFeature.bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${activeFeature.color}15` }}>
                    <CheckCircle2 className="h-3.5 w-3.5" style={{ color: activeFeature.color }} />
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{bullet}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <button className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:scale-105" style={{ background: `linear-gradient(135deg, ${activeFeature.color}, ${activeFeature.color}cc)`, boxShadow: `0 4px 20px ${activeFeature.color}35` }}>
                Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-600 transition-all duration-300 hover:scale-105" style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right — LIGHT dashboard preview */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl" style={{ background: `radial-gradient(ellipse, ${activeFeature.color}15 0%, transparent 70%)`, filter: 'blur(20px)' }} />
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ background: 'white', border: `1px solid ${activeFeature.color}20`, boxShadow: `0 20px 60px rgba(0,0,0,0.10), 0 0 0 1px ${activeFeature.color}10` }}
            >
              {/* Chrome bar */}
              <div className="flex items-center gap-2 px-5 py-3.5" style={{ background: '#f8fafc', borderBottom: `1px solid ${activeFeature.color}15` }}>
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full" style={{ background: activeFeature.color }} />
                <span className="ml-3 text-xs font-medium text-slate-500">{activeFeature.title}</span>
              </div>
              <div className="p-5">
                <DashboardPreview previewType={activeFeature.preview} color={activeFeature.color} />
              </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-3 rounded-b-xl w-3/4" style={{ background: '#e2e8f0' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
