'use client'

import { Eye, Zap, Lock, BarChart3 } from 'lucide-react'

const benefits = [
  { icon: Eye, title: 'Real-Time Fleet Visibility', description: 'Monitor every vehicle, driver, and trip in real-time with live GPS tracking and status updates.', features: ['Live GPS tracking', 'Real-time alerts', 'Route optimization'], color: '#10b981' },
  { icon: Zap, title: 'Automated Operations', description: 'Reduce manual work with intelligent automation for dispatching, scheduling, and reporting.', features: ['Smart dispatch', 'Auto-scheduling', 'Batch operations'], color: '#8b5cf6' },
  { icon: Lock, title: 'Secure Role-Based Access', description: 'Enterprise-grade security with role-based access control and audit trails.', features: ['Multi-role support', 'Audit logs', 'Data encryption'], color: '#06b6d4' },
  { icon: BarChart3, title: 'Actionable Business Insights', description: 'Comprehensive analytics and reports to make data-driven decisions and drive profitability.', features: ['Custom reports', 'KPI tracking', 'Performance analytics'], color: '#f59e0b' },
]

export function Benefits() {
  return (
    <section className="py-28 relative overflow-hidden bg-white">
      {/* Soft bg blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Why Choose Us</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Premium Benefits for
            <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Fleet Excellence
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Everything you need to run a world-class transport operation — in one platform.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="group relative rounded-2xl p-8 transition-all duration-400 hover:-translate-y-1 cursor-default"
                style={{ background: 'white', border: `1px solid ${benefit.color}18`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 50px ${benefit.color}15, 0 4px 20px rgba(0,0,0,0.06)`; e.currentTarget.style.borderColor = `${benefit.color}35` }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = `${benefit.color}18` }}
              >
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${benefit.color}, transparent)` }} />

                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${benefit.color}10`, border: `1px solid ${benefit.color}25` }}
                  >
                    <Icon className="h-7 w-7" style={{ color: benefit.color }} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{benefit.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {benefit.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
                          style={{ background: `${benefit.color}10`, border: `1px solid ${benefit.color}22`, color: benefit.color }}
                        >
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats row */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '40%', label: 'Cost Reduction', color: '#10b981' },
            { value: '3×', label: 'Faster Dispatch', color: '#06b6d4' },
            { value: '99.9%', label: 'Platform Uptime', color: '#8b5cf6' },
            { value: '<5min', label: 'Avg Setup Time', color: '#f59e0b' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-5 text-center"
              style={{ background: `${stat.color}07`, border: `1px solid ${stat.color}18` }}
            >
              <p className="font-display text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
