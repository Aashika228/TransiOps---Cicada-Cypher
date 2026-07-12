'use client'

import { AlertCircle, TrendingDown, Eye, ArrowRight } from 'lucide-react'

const problems = [
  {
    icon: AlertCircle,
    number: '01',
    title: 'Scheduling Conflicts',
    description: 'Manual planning creates double-bookings, inefficiencies, and wasted resources. Our intelligent system prevents conflicts before they happen.',
    iconColor: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
    glow: 'rgba(239,68,68,0.12)',
  },
  {
    icon: TrendingDown,
    number: '02',
    title: 'Underutilized Fleet',
    description: 'Idle vehicles drain profitability. Get real-time visibility into fleet usage and maximize the ROI on every single asset you own.',
    iconColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #fb923c)',
    glow: 'rgba(245,158,11,0.12)',
  },
  {
    icon: Eye,
    number: '03',
    title: 'Zero Real-Time Visibility',
    description: 'Operating without live data is flying blind. Get comprehensive dashboards that surface actionable intelligence exactly when you need it.',
    iconColor: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
    glow: 'rgba(139,92,246,0.12)',
  },
]

export function Problems() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, white 0%, #fafafa 100%)' }}>
      {/* Subtle divider stripe */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)' }} />

      {/* Bg accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)', transform: 'translateX(30%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)', transform: 'translate(-20%, 30%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-end mb-20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">The Problem</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.0] tracking-tight">
              The Old Way
              <br />
              <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Is Costing You.
              </span>
            </h2>
          </div>
          <div>
            <p className="text-lg text-slate-500 leading-relaxed">
              Every day your team relies on spreadsheets, WhatsApp messages, and gut instinct — you are leaving efficiency, money, and safety on the table. Here's what's breaking down.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <div
                key={problem.title}
                className="group relative rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default"
                style={{
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  transitionDelay: `${index * 60}ms`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 24px 60px ${problem.glow}, 0 4px 20px rgba(0,0,0,0.06)` }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)' }}
              >
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: problem.gradient }} />

                {/* Large faded number */}
                <div className="absolute top-4 right-6 font-display text-8xl font-extrabold text-slate-100 select-none leading-none">{problem.number}</div>

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: problem.gradient, boxShadow: `0 8px 24px ${problem.glow}` }}>
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{problem.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{problem.description}</p>

                <div className="flex items-center gap-1.5 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-bold" style={{ color: problem.iconColor }}>
                  See our solution <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
