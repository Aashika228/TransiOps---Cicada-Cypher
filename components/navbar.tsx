'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-bold text-xl leading-none">V</span>
            </div>
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
              Vahaan Saarthi
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-500 transition-colors">Features</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-500 transition-colors">Solutions</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-500 transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-500 transition-colors">Resources</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/auth" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors px-2 py-2">
              Log in
            </Link>
            <Link
              href="/auth"
              className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 4px 14px rgba(16,185,129,0.25)',
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
