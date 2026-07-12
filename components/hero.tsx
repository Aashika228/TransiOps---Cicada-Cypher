'use client'

import { ArrowRight, Map, Gauge, Users, Sparkles, Play, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const duration = 2200
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [hasStarted, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const tickerItems = [
  '🚚 Real-time GPS Tracking',
  '⛽ Fuel Cost Optimization',
  '🔧 Preventive Maintenance',
  '📊 Live Analytics Dashboard',
  '🛡️ Role-Based Access Control',
  '📄 Auto Report Generation',
  '🗺️ Smart Route Planning',
  '👥 Driver Performance Scores',
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setIsVisible(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section className="relative min-h-screen overflow-hidden pt-20 bg-gradient-to-br from-[#f0fdf9] via-[#ecfdf5] to-[#faf5ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-dark opacity-70" />

      {/* Drifting orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[800px] h-[800px] rounded-full animate-orb-drift"
          style={{ background: 'radial-gradient(circle at 40% 40%, rgba(16,185,129,0.18) 0%, transparent 60%)', filter: 'blur(1px)' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full animate-orb-drift"
          style={{ background: 'radial-gradient(circle at 60% 40%, rgba(139,92,246,0.13) 0%, transparent 60%)', filter: 'blur(1px)', animationDelay: '7s', animationDuration: '25s' }} />
        <div className="absolute bottom-[-15%] right-[20%] w-[600px] h-[600px] rounded-full animate-orb-drift"
          style={{ background: 'radial-gradient(circle at 50% 60%, rgba(6,182,212,0.10) 0%, transparent 60%)', filter: 'blur(1px)', animationDelay: '14s', animationDuration: '18s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-5rem)] py-14">

          {/* ── Left ── */}
          <div
            className="space-y-8"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(36px)', transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full badge-shimmer cursor-default">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-[0.12em]">Smart Fleet Operations</span>
              <ChevronRight className="h-3 w-3 text-emerald-400" />
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 leading-[1.05] tracking-tight">
                Manage Your<br />Entire Fleet.
              </h1>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight animate-gradient-shift"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 40%, #8b5cf6 80%, #10b981 100%)',
                  backgroundSize: '300% 300%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                Smarter. Faster.
              </h1>
            </div>

            <p className="text-xl text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-relaxed max-w-lg font-medium">
              Replace spreadsheets with a centralized transport platform — real-time tracking, smart dispatch, fuel analytics, and automated compliance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-white text-base overflow-hidden transition-all duration-300 hover:scale-[1.03]"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)', boxShadow: '0 8px 32px rgba(16,185,129,0.40), 0 2px 8px rgba(16,185,129,0.20)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }} />
              </button>

              <button
                className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-slate-700 dark:text-slate-300 text-base transition-all duration-300 hover:scale-[1.03] hover:border-emerald-200"
                style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(226,232,240,0.9)', boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2.5" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                  <Play className="h-3.5 w-3.5 text-white ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              {[
                { target: 2500, suffix: '+', label: 'Vehicles Managed', color: '#10b981' },
                { target: 98, suffix: '%', label: 'Fleet Utilization', color: '#06b6d4' },
                { target: 99, suffix: '.9%', label: 'Uptime SLA', color: '#8b5cf6' },
              ].map((stat) => (
                <div key={stat.label} className="group space-y-1.5 cursor-default">
                  <p className="text-3xl md:text-4xl font-display font-extrabold" style={{ color: stat.color }}>
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold tracking-wide">{stat.label}</p>
                  <div className="h-0.5 w-0 group-hover:w-8 transition-all duration-500 rounded-full" style={{ background: stat.color }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Dashboard ── */}
          <div
            className="relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0) rotate(0deg)' : 'translateX(60px) rotate(2deg)' }}
          >
            {/* Glow blob behind card */}
            <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(ellipse_at_40%_50%,rgba(16,185,129,0.20)_0%,rgba(139,92,246,0.10)_60%,transparent_80%)] blur-[32px]" />

            {/* Dashboard card */}
            <div className="relative rounded-3xl overflow-hidden animate-float bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-[0_40px_100px_rgba(0,0,0,0.14),0_8px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] dark:shadow-none">

              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ee5a24]" />
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#ffd93d] to-[#f9ca24]" />
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#6bcb77] to-[#4d9de0]" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="h-5 rounded-lg flex items-center px-3 bg-black/5 dark:bg-black/20">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">app.vahansaarthi.com/dashboard</span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-md bg-emerald-500/15" />
              </div>

              {/* Header row */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-50 tracking-tight">Fleet Overview</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Last updated: Just now</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600">LIVE</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Gauge, label: 'Fleet Status', value: '156/158', color: 'emerald', bg: 'bg-emerald-50' },
                    { icon: Map, label: 'Active Routes', value: '48', color: 'cyan', bg: 'bg-cyan-50' },
                    { icon: Users, label: 'On Duty', value: '92', color: 'violet', bg: 'bg-violet-50' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className={`rounded-2xl p-3.5 space-y-2 ${item.bg} border border-${item.color}-200/20`}>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-${item.color}-500/20`}>
                          <Icon className={`h-3.5 w-3.5 text-${item.color}-500`} />
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{item.label}</p>
                        <p className="text-sm font-extrabold text-slate-900 dark:text-slate-50">{item.value}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Chart */}
                <div className="rounded-2xl p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Fleet Utilization</p>
                    <span className="text-[10px] font-semibold text-emerald-600">↑ 12% this month</span>
                  </div>
                  <div className="flex items-end justify-between h-16 gap-1">
                    {[50, 62, 58, 70, 78, 85, 90, 96].map((height, i) => (
                      <div key={i} className="flex-1 rounded-t-md relative overflow-hidden" style={{ height: `${height}%` }}>
                        <div className="absolute inset-0 rounded-t-md opacity-[0.55+i/8*0.45] bg-gradient-to-t from-emerald-500 to-emerald-400" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live trips */}
                <div className="space-y-2">
                  {[
                    { trip: 'Trip #2401 · Delhi → Mumbai', status: 'On Track', colorClass: 'text-emerald-500 bg-emerald-500/15' },
                    { trip: 'Trip #2402 · Blr → Chennai', status: 'On Track', colorClass: 'text-cyan-500 bg-cyan-500/15' },
                    { trip: 'Trip #2403 · Hyd → Pune', status: 'Delayed 8m', colorClass: 'text-amber-500 bg-amber-500/15' },
                  ].map((item) => (
                    <div key={item.trip} className="flex items-center justify-between text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">{item.trip}</span>
                      <span className={`font-bold text-[11px] px-2 py-0.5 rounded-full ${item.colorClass}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-5 -right-5 px-4 py-2.5 rounded-2xl text-xs font-bold text-white animate-float-delayed shadow-xl dark:shadow-none bg-gradient-to-br from-emerald-500 to-emerald-600"
              style={{ animationDelay: '1.5s', zIndex: 10 }}>
              📈 +23% Efficiency
            </div>
            <div className="absolute -bottom-5 -left-5 px-4 py-2.5 rounded-2xl text-xs font-bold text-white animate-float-delayed shadow-xl dark:shadow-none bg-gradient-to-br from-violet-500 to-violet-600"
              style={{ animationDelay: '3s', zIndex: 10 }}>
              🚚 Live Tracking
            </div>
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 px-3 py-2 rounded-2xl text-[11px] font-bold text-white animate-float-delayed shadow-xl dark:shadow-none bg-gradient-to-br from-cyan-500 to-cyan-600"
              style={{ animationDelay: '5s', zIndex: 10 }}>
              🛡️ 99.9% Uptime
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-emerald-500/10">
        <div className="ticker-wrapper py-3">
          <div className="ticker-inner">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 mx-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {item}
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
