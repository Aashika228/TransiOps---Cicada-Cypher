'use client'

import { Eye, Zap, Lock, BarChart3, CheckCircle2 } from 'lucide-react'

const benefits = [
  {
    icon: Eye,
    title: 'Real-Time Fleet Visibility',
    description: 'Monitor every vehicle, driver, and trip in real-time with live GPS tracking and instant status updates across your entire fleet.',
    features: ['Live GPS tracking', 'Real-time alerts', 'Route deviation detection'],
    color: '#10b981',
    bg: '#ecfdf5',
    span: 'lg:col-span-2',
  },
  {
    icon: Zap,
    title: 'Automated Operations',
    description: 'Reduce manual work by 80% with intelligent automation for dispatching, maintenance scheduling, and report generation.',
    features: ['Smart dispatch', 'Auto-scheduling', 'Batch operations'],
    color: '#8b5cf6',
    bg: '#f5f3ff',
    span: '',
  },
  {
    icon: Lock,
    title: 'Enterprise-Grade Security',
    description: 'Role-based access control, audit trails, and two-factor authentication keep your data safe.',
    features: ['Multi-role support', 'Audit logs', '2FA'],
    color: '#06b6d4',
    bg: '#ecfeff',
    span: '',
  },
  {
    icon: BarChart3,
    title: 'Actionable Business Intelligence',
    description: 'Comprehensive analytics, KPI dashboards, and custom reports to make data-driven decisions that drive profitability across all locations.',
    features: ['Custom reports', 'KPI tracking', 'Multi-branch analytics'],
    color: '#f59e0b',
    bg: '#fffbeb',
    span: 'lg:col-span-2',
  },
]

export function Benefits() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, white 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Why Choose Us</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Built for
            <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Fleet Excellence
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Everything a modern transport operation needs — unified in one intuitive platform.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid lg:grid-cols-3 gap-5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className={`group relative rounded-3xl p-8 overflow-hidden transition-all duration-400 hover:-translate-y-1 cursor-default ${benefit.span}`}
                style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 50px ${benefit.color}15, 0 4px 20px rgba(0,0,0,0.06)` }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)' }}
              >
                {/* Faded bg circle */}
                <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full opacity-60 group-hover:opacity-90 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${benefit.color}15 0%, transparent 70%)` }} />

                {/* Top accent line animated on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${benefit.color}, ${benefit.color}88, ${benefit.color})` }} />

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: benefit.bg, border: `1.5px solid ${benefit.color}25` }}>
                  <Icon className="h-7 w-7" style={{ color: benefit.color }} />
                </div>

                <h3 className="font-display text-2xl font-extrabold text-slate-900 mb-3 leading-tight">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{benefit.description}</p>

                <div className="flex flex-wrap gap-2">
                  {benefit.features.map((feature) => (
                    <span key={feature} className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full"
                      style={{ background: `${benefit.color}12`, color: benefit.color }}>
                      <CheckCircle2 className="h-3 w-3" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '40%', label: 'Cost Reduction', color: '#10b981', bg: '#ecfdf5' },
            { value: '3×', label: 'Faster Dispatch', color: '#06b6d4', bg: '#ecfeff' },
            { value: '99.9%', label: 'Platform Uptime', color: '#8b5cf6', bg: '#f5f3ff' },
            { value: '<5min', label: 'Avg Setup Time', color: '#f59e0b', bg: '#fffbeb' },
          ].map((stat) => (
            <div key={stat.label} className="group rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 cursor-default"
              style={{ background: stat.bg, border: `1px solid ${stat.color}20` }}>
              <p className="font-display text-4xl font-extrabold mb-1.5" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs text-slate-500 font-bold tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
