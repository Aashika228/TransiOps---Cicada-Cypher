'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'

const faqs = [
  { question: 'How does fleet tracking work?', answer: 'Our platform uses advanced GPS technology integrated with your vehicles to provide real-time tracking. Each vehicle transmits location data every 10–30 seconds, allowing you to monitor the entire fleet on an interactive map with full historical trip data.' },
  { question: 'Can multiple branches be managed from one account?', answer: 'Absolutely! Vahan Saarthi supports multi-location management with centralized control. Manage multiple branches from a single dashboard with branch-specific analytics, budgets, and reporting. Role-based access lets regional managers control their zones while maintaining company-wide visibility.' },
  { question: 'Does the platform support maintenance reminders?', answer: 'Yes — our intelligent maintenance module tracks service schedules, generates automatic reminders before due dates, and maintains a complete service history. Set custom intervals based on mileage or time and receive alerts before vehicles go overdue.' },
  { question: 'Can I export reports in different formats?', answer: 'Yes, you can export comprehensive reports in CSV and PDF formats. Generate custom reports for expenses, fuel consumption, driver performance, and maintenance records. Schedule automated delivery to your email daily, weekly, or monthly.' },
  { question: 'What security measures are in place?', answer: 'We implement enterprise-grade security: end-to-end encryption, role-based access control, two-factor authentication, audit logs for every operation, and compliance with industry standards. Data is stored with automated backups and a full disaster recovery protocol.' },
  { question: 'What is the onboarding process like?', answer: 'Our dedicated onboarding team gets you up and running in 5–7 business days — including device installation, team training, data migration, and full customization support. You can start with a 30-day free trial to evaluate the platform with your full fleet before committing.' },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, white 0%, #f8fafc 100%)' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      {/* Center bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <HelpCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">FAQ</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Got Questions?
            <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              We've Got Answers.
            </span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Everything you need to know about Vahan Saarthi.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  background: isOpen ? 'white' : 'white',
                  border: isOpen ? '1.5px solid rgba(16,185,129,0.3)' : '1.5px solid #f1f5f9',
                  boxShadow: isOpen ? '0 12px 40px rgba(16,185,129,0.10), 0 4px 16px rgba(0,0,0,0.04)' : '0 2px 8px rgba(0,0,0,0.03)',
                }}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="flex items-center gap-4 px-6 py-5">
                  {/* Number */}
                  <span className="text-xs font-extrabold tabular-nums flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ background: isOpen ? 'rgba(16,185,129,0.12)' : '#f8fafc', color: isOpen ? '#10b981' : '#94a3b8' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Question */}
                  <span className="flex-1 font-bold text-base leading-snug transition-colors duration-200" style={{ color: isOpen ? '#0f172a' : '#334155' }}>
                    {faq.question}
                  </span>
                  {/* Chevron */}
                  <ChevronDown className="h-5 w-5 flex-shrink-0 transition-all duration-300" style={{ color: isOpen ? '#10b981' : '#cbd5e1', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </div>

                <div style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease' }}>
                  <div className="px-6 pb-5 pl-[3.75rem]">
                    <p className="text-slate-500 leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.07), rgba(6,182,212,0.07))', border: '1px solid rgba(16,185,129,0.15)' }}>
          <MessageCircle className="h-8 w-8 mx-auto mb-3 text-emerald-500" />
          <p className="font-bold text-slate-800 mb-1">Still have questions?</p>
          <p className="text-sm text-slate-500 mb-4">Our team is available 24/7 to help you get started.</p>
          <a href="mailto:hello@vahansaarthi.com"
            className="inline-flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 6px 20px rgba(16,185,129,0.3)' }}>
            Contact our team
          </a>
        </div>
      </div>
    </section>
  )
}
