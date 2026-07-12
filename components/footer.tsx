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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-10 md:p-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-md" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Get Started Today</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            Ready to Modernize Your
            <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Fleet Operations?
            </span>
          </h2>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
            Join hundreds of companies managing their fleets smarter with Vahaan Saarthi. Start your free 30-day trial — no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 30px rgba(16,185,129,0.35)' }}
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-slate-700 transition-all duration-300 hover:scale-105"
              style={{ background: 'white', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
            >
              Schedule Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8" style={{ borderTop: '1px solid #f1f5f9' }}>
            {['30-day free trial', 'No credit card required', 'Setup in 5–7 days', '24/7 support'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#10b98115' }}>
                  <span className="text-emerald-500 text-[10px]">✓</span>
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
    <footer style={{ background: '#0f172a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-xl font-bold text-white">Vahaan Saarthi</h3>
              <p className="text-xs text-slate-400 mt-1">Smart Transport Operations Platform</p>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering fleet managers with intelligent tools to run modern, efficient transport operations.
            </p>
            <div className="flex gap-3 pt-2">
            {socialLinks.map(({ label, title }) => (
                <button
                  key={label}
                  title={title}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(16,185,129,0.2)'; e.currentTarget.style.color = '#10b981'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm">Product</h4>
            <ul className="space-y-2.5">
              {['Features', 'Solutions', 'Pricing', 'Security'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm">Company</h4>
            <ul className="space-y-2.5">
              {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm">Resources</h4>
            <ul className="space-y-2.5">
              {['Documentation', 'API Reference', 'Help Center', 'Status'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:hello@vahaansaarthi.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                <Mail className="h-4 w-4 flex-shrink-0" />
                hello@vahaansaarthi.com
              </a>
              <a href="tel:+918000000000" className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                <Phone className="h-4 w-4 flex-shrink-0" />
                +91 800 000 0000
              </a>
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                New Delhi, India
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-sm text-slate-500">© 2024 Vahaan Saarthi. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-slate-500 hover:text-emerald-400 transition-colors duration-200">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
