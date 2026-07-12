'use client'

import { AlertCircle, TrendingDown, Eye } from 'lucide-react'

const problems = [
  {
    icon: AlertCircle,
    title: 'Scheduling Conflicts',
    description: 'Manual planning and dispatch create inefficiencies, double-bookings, and wasted resources. Our intelligent system prevents conflicts before they happen.',
    iconColor: '#ef4444',
    bgColor: 'rgba(239,68,68,0.07)',
    borderColor: 'rgba(239,68,68,0.15)',
    glowColor: 'rgba(239,68,68,0.12)',
    topAccent: 'linear-gradient(90deg, #ef4444, #f97316)',
  },
  {
    icon: TrendingDown,
    title: 'Underutilized Fleet',
    description: 'Idle vehicles and poor resource allocation drain your profitability. Get real-time visibility into fleet usage and maximize every asset.',
    iconColor: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.07)',
    borderColor: 'rgba(245,158,11,0.15)',
    glowColor: 'rgba(245,158,11,0.12)',
    topAccent: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
  },
  {
    icon: Eye,
    title: 'Limited Visibility',
    description: 'Without real-time monitoring and insights, you are operating blind. Get comprehensive dashboards with actionable intelligence.',
    iconColor: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.07)',
    borderColor: 'rgba(139,92,246,0.15)',
    glowColor: 'rgba(139,92,246,0.12)',
    topAccent: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
  },
]

export function Problems() {
  return (
    <section className="py-28 relative overflow-hidden bg-white">
      {/* Subtle bg accents */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', transform: 'translate(40%, -40%)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', transform: 'translate(-40%, 40%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
            <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">The Problem</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Transport Operations
            <br />
            <span className="text-slate-400">Shouldn&apos;t Depend on</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Spreadsheets
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Every day without the right tools costs you time, money, and fleet performance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <div
                key={problem.title}
                className="group relative rounded-2xl p-8 transition-all duration-400 hover:-translate-y-2 cursor-default"
                style={{ background: 'white', border: `1px solid ${problem.borderColor}`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transitionDelay: `${index * 60}ms` }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 60px ${problem.glowColor}, 0 4px 20px rgba(0,0,0,0.06)` }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)' }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: problem.topAccent }} />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: problem.bgColor, border: `1px solid ${problem.borderColor}` }}
                >
                  <Icon className="h-7 w-7" style={{ color: problem.iconColor }} />
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{problem.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{problem.description}</p>

                <div className="mt-6 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: problem.iconColor }}>
                  See how we solve this →
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
