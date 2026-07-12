'use client'

import { ArrowRight, Map, Gauge, Users, Sparkles, Play } from 'lucide-react'
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
    const duration = 2000
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

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setIsVisible(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-20 md:pt-28"
      style={{ background: 'linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 30%, #f0f9ff 70%, #faf5ff 100%)' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Soft glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%)', transform: 'translate(-30%, -20%)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)', transform: 'translate(20%, -20%)' }} />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%)', transform: 'translateY(30%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-5rem)] py-10">

          {/* Left */}
          <div
            className="space-y-8"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">Smart Fleet Operations</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight">
              Manage Your
              <br />Entire Fleet.
              <br />
              <span
                className="animate-gradient-shift"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Smarter. Faster.
              </span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Replace spreadsheets and manual logbooks with a centralized transport platform — streamlining dispatch, maintenance, fuel tracking, and real-time analytics.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group inline-flex items-center justify-center h-13 px-8 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 30px rgba(16,185,129,0.35)', padding: '0.75rem 2rem' }}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                className="group inline-flex items-center justify-center rounded-xl font-semibold text-slate-700 transition-all duration-300 hover:scale-105"
                style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', padding: '0.75rem 2rem' }}
              >
                <Play className="h-4 w-4 mr-2 text-emerald-500" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              {[
                { target: 2500, suffix: '+', label: 'Vehicles Managed' },
                { target: 98, suffix: '%', label: 'Fleet Utilization' },
                { target: 99, suffix: '.9%', label: 'Uptime SLA' },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-3xl md:text-4xl font-display font-bold text-slate-900">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard card */}
          <div
            className="relative"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(40px)', transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s' }}
          >
            {/* Card glow */}
            <div className="absolute -inset-4 rounded-3xl" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)', filter: 'blur(24px)' }} />

            {/* Dashboard */}
            <div
              className="relative rounded-2xl overflow-hidden animate-float"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 30px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)' }}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="flex-1 mx-4">
                  <div className="h-5 rounded-md flex items-center px-3" style={{ background: '#e2e8f0' }}>
                    <span className="text-xs text-slate-500">app.vahaansaarthi.com/dashboard</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Gauge, label: 'Fleet Status', value: '156/158', color: '#10b981' },
                    { icon: Map, label: 'Active Routes', value: '48', color: '#06b6d4' },
                    { icon: Users, label: 'Drivers On Duty', value: '92', color: '#8b5cf6' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="rounded-xl p-3 space-y-2" style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}>
                        <Icon className="h-4 w-4" style={{ color: item.color }} />
                        <p className="text-[10px] text-slate-500">{item.label}</p>
                        <p className="text-base font-bold text-slate-800">{item.value}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Chart */}
                <div className="rounded-xl p-4" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <p className="text-[10px] font-semibold text-slate-500 mb-3 uppercase tracking-wider">Fleet Utilization Trend</p>
                  <div className="flex items-end justify-between h-14 gap-1">
                    {[65, 72, 68, 78, 85, 92, 88, 96].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${height}%`,
                          background: `linear-gradient(to top, #10b981, ${i > 5 ? '#06b6d4' : '#34d399'})`,
                          opacity: 0.6 + (i / 8) * 0.4,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Trips */}
                <div className="space-y-2">
                  {[
                    { trip: 'Trip #2401 · Delivery', status: '48 km/h', color: '#10b981' },
                    { trip: 'Trip #2402 · Pickup', status: '62 km/h', color: '#06b6d4' },
                  ].map((item) => (
                    <div key={item.trip} className="flex items-center justify-between text-xs px-3 py-2 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <span className="text-slate-600 font-medium">{item.trip}</span>
                      <span className="font-semibold" style={{ color: item.color }}>{item.status}</span>
                    </div>
                  ))}
                </div>

                {/* Alert */}
                <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
                  <p className="text-[11px] font-semibold text-amber-700">⚠️ 3 vehicles scheduled for maintenance today</p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div
              className="absolute -top-4 -right-4 px-3 py-2 rounded-xl text-xs font-semibold text-white animate-float-delayed"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 24px rgba(16,185,129,0.4)', animationDelay: '1s' }}
            >
              ↑ 23% efficiency
            </div>
            <div
              className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl text-xs font-semibold text-white animate-float-delayed"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', boxShadow: '0 8px 24px rgba(139,92,246,0.4)', animationDelay: '2s' }}
            >
              🚚 Live tracking
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, white, transparent)' }} />
    </section>
  )
}
