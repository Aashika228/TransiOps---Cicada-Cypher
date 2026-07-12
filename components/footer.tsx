'use client'

import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

const socialLinks = [
  { label: 'FB', title: 'Facebook' },
  { label: 'X', title: 'Twitter / X' },
  { label: 'in', title: 'LinkedIn' },
  { label: '▶', title: 'YouTube' },
]

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#f0f9ff' }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100 z-0 pointer-events-none"
      >
        <source src="/videos/CustomerSection.webm" type="video/webm" />
      </video>

      {/* Subtle dark overlay to make text pop */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(135deg, rgba(5,10,20,0.3) 0%, rgba(0,0,0,0.1) 100%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-10 md:p-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-md" style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.35)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Get Started Today</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight drop-shadow-2xl">
            Ready to Modernize Your
            <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Fleet Operations?
            </span>
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 font-medium">
            Join hundreds of companies managing their fleets smarter with Vahaan Saarthi. Start your free 30-day trial — no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 12px 40px rgba(16,185,129,0.5)' }}
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105 backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)' }}
            >
              Schedule Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            {['30-day free trial', 'No credit card required', 'Setup in 5–7 days', '24/7 support'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-semibold text-white/60">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.3)' }}>
                  <span className="text-emerald-400 text-[10px]">✓</span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{ background: '#0a0f1e' }}>
      {/* Top gradient line */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #10b981, #8b5cf6, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 14px rgba(16,185,129,0.4)' }}>
                <span className="text-white font-extrabold text-lg leading-none">V</span>
              </div>
              <div>
                <p className="font-display font-extrabold text-lg text-white tracking-tight">Vahaan Saarthi</p>
                <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-widest">Fleet Intelligence</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering fleet managers with intelligent tools to run modern, efficient transport operations.
            </p>
            <div className="flex gap-2.5 pt-1">
              {socialLinks.map(({ label, title }) => (
                <button
                  key={label}
                  title={title}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(16,185,129,0.15)'; e.currentTarget.style.color = '#10b981'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Product', items: ['Features', 'Solutions', 'Pricing', 'Security', 'Changelog'] },
            { title: 'Company', items: ['About', 'Blog', 'Careers', 'Press', 'Partners'] },
            { title: 'Resources', items: ['Documentation', 'API Reference', 'Help Center', 'Status', 'Community'] },
          ].map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="font-bold text-white text-sm tracking-wide">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm tracking-wide">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:hello@vahaansaarthi.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-400 transition-colors duration-200">
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                hello@vahaansaarthi.com
              </a>
              <a href="tel:+918000000000" className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-400 transition-colors duration-200">
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                +91 800 000 0000
              </a>
              <div className="flex items-start gap-2 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                New Delhi, India
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs text-slate-600">© 2024 Vahaan Saarthi Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-xs text-slate-600 hover:text-emerald-400 transition-colors duration-200">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
