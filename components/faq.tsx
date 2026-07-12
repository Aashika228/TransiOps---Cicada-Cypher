'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  { question: 'How does fleet tracking work?', answer: 'Our platform uses advanced GPS technology integrated with your vehicles to provide real-time tracking. Each vehicle equipped with our tracking device transmits location data every 10–30 seconds, allowing you to monitor the entire fleet on an interactive map with historical trip data.' },
  { question: 'Can multiple branches be managed?', answer: 'Absolutely! Vahaan Saarthi supports multi-location management with centralized control. You can manage multiple branches from a single dashboard with branch-specific analytics, budgets, and reporting. Role-based access allows regional managers to control their branches while maintaining company-wide visibility.' },
  { question: 'Does the platform support maintenance reminders?', answer: 'Yes, our intelligent maintenance management system tracks service schedules, generates automatic reminders before due dates, and maintains complete service history. You can set custom maintenance intervals and receive alerts based on mileage or time periods.' },
  { question: 'Can reports be exported?', answer: 'Yes, you can export comprehensive reports in CSV and PDF formats. Generate custom reports for expenses, fuel consumption, driver performance, maintenance records, and operational metrics. Schedule automated report generation and have them sent to your email daily, weekly, or monthly.' },
  { question: 'What security measures are in place?', answer: 'We implement enterprise-grade security including end-to-end encryption, role-based access control, two-factor authentication, audit logs for all operations, and compliance with industry standards. Your data is securely stored with regular backups and disaster recovery protocols.' },
  { question: 'What is the onboarding process?', answer: 'Our dedicated onboarding team will help you set up the platform in typically 5–7 business days. We provide equipment installation, team training, data migration, and customization support. You can start with a 30-day free trial to evaluate the platform with your full fleet.' },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
      {/* Dot grid */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.10) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <HelpCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">FAQ</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Frequently Asked
            <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Questions
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Find answers to common questions about Vahaan Saarthi.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen ? 'white' : 'white',
                  border: isOpen ? '1px solid rgba(16,185,129,0.3)' : '1px solid #e2e8f0',
                  boxShadow: isOpen ? '0 8px 30px rgba(16,185,129,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Left accent bar */}
                    <div
                      className="w-0.5 self-stretch rounded-full flex-shrink-0 transition-all duration-300"
                      style={{ background: 'linear-gradient(to bottom, #10b981, #06b6d4)', opacity: isOpen ? 1 : 0.25, minHeight: '1.5rem' }}
                    />
                    <span className="font-semibold text-base leading-snug" style={{ color: isOpen ? '#0f172a' : '#334155' }}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className="h-5 w-5 flex-shrink-0 transition-all duration-300"
                    style={{ color: isOpen ? '#10b981' : '#94a3b8', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? '250px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  }}
                >
                  <div className="px-6 pb-5 pl-12">
                    <p className="text-slate-500 leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-slate-400 text-sm mt-10">
          Still have questions?{' '}
          <a href="mailto:hello@vahaansaarthi.com" className="text-emerald-600 hover:text-emerald-500 font-semibold transition-colors">
            Contact our team →
          </a>
        </p>
      </div>
    </section>
  )
}
