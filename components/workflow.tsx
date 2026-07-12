'use client'

import { Truck, ClipboardList, Zap, MapPin, BarChart3, CheckCircle, Wrench, BarChart2 } from 'lucide-react'

const steps = [
  { icon: Truck, label: 'Vehicle Registration', number: 1, color: '#10b981' },
  { icon: ClipboardList, label: 'Driver Assignment', number: 2, color: '#06b6d4' },
  { icon: Zap, label: 'Trip Creation', number: 3, color: '#8b5cf6' },
  { icon: MapPin, label: 'Dispatch', number: 4, color: '#f59e0b' },
  { icon: BarChart3, label: 'Live Monitoring', number: 5, color: '#f97316' },
  { icon: CheckCircle, label: 'Trip Completion', number: 6, color: '#10b981' },
  { icon: Wrench, label: 'Maintenance', number: 7, color: '#06b6d4' },
  { icon: BarChart2, label: 'Analytics & Reports', number: 8, color: '#8b5cf6' },
]

export function Workflow() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0fdf9 0%, #f8fafc 100%)' }}>
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      {/* Soft center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2" style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.22)' }}>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">How It Works</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
            Streamlined Operations
            <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Workflow
            </span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 max-w-2xl mx-auto">
            A complete workflow designed for efficiency — from vehicle registration to analytics.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-[2.75rem] left-[4%] right-[4%] h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6, #f59e0b, #f97316, #10b981, #06b6d4, #8b5cf6)', opacity: 0.4 }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.label} className="flex flex-col items-center gap-3 group cursor-default">
                  <div className="relative z-10">
                    {/* Hover glow */}
                    <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300" style={{ background: step.color, filter: 'blur(10px)' }} />
                    {/* Card */}
                    <div
                      className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                      style={{ background: `${step.color}12`, border: `1.5px solid ${step.color}35`, boxShadow: `0 4px 16px ${step.color}15` }}
                    >
                      <Icon className="h-8 w-8" style={{ color: step.color }} />
                    </div>
                    {/* Number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`, boxShadow: `0 2px 8px ${step.color}50` }}
                    >
                      {step.number}
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500 text-center leading-tight group-hover:text-slate-900 dark:text-slate-50 transition-colors duration-200">
                    {step.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 rounded-2xl p-6 text-center" style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
          <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 text-sm">
            <span className="text-slate-900 dark:text-slate-50 font-semibold">All 8 modules work together</span> — seamlessly integrated in one platform for complete operational control.
          </p>
        </div>
      </div>
    </section>
  )
}
