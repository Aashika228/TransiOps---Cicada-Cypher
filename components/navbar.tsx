'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled
        ? { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(16,185,129,0.1)', padding: '0.75rem 0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }
        : { background: 'transparent', padding: '1.25rem 0' }
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:rotate-6"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 14px rgba(16,185,129,0.35)' }}>
              <span className="text-white font-extrabold text-lg leading-none">V</span>
            </div>
            <div>
              <span className="font-display font-extrabold text-xl text-slate-900 tracking-tight">Vahaan Saarthi</span>
              <span className="hidden sm:block text-[9px] text-slate-400 font-semibold uppercase tracking-widest -mt-0.5">Fleet Intelligence</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {['Features', 'Solutions', 'Pricing', 'Resources'].map((item) => (
              <a key={item} href="#"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200">
                {item}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/auth"
              className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors px-3 py-2">
              Log in
            </Link>
            <Link href="/auth"
              className="group relative inline-flex items-center justify-center text-sm font-bold text-white px-5 py-2.5 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.04]"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 16px rgba(16,185,129,0.35)' }}>
              Get Started Free
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #059669, #047857)' }} />
              <span className="relative z-10">Get Started Free</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
