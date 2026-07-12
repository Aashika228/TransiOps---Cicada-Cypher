'use client'

import { useState } from 'react'
import { Truck, Briefcase, ShieldCheck, Landmark, Mail, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Role = 'Driver' | 'Fleet Manager' | 'Safety Officer' | 'Finance'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [selectedRole, setSelectedRole] = useState<Role>('Fleet Manager')
  
  // Controlled inputs for pre-filling
  const [email, setEmail] = useState('manager@vahaansaarthi.com')
  const [password, setPassword] = useState('demo1234')

  const roles: { id: Role; icon: any; color: string; placeholder: string }[] = [
    { id: 'Driver', icon: Truck, color: '#06b6d4', placeholder: 'driver@vahaansaarthi.com' },
    { id: 'Fleet Manager', icon: Briefcase, color: '#10b981', placeholder: 'manager@vahaansaarthi.com' },
    { id: 'Safety Officer', icon: ShieldCheck, color: '#8b5cf6', placeholder: 'safety@vahaansaarthi.com' },
    { id: 'Finance', icon: Landmark, color: '#f59e0b', placeholder: 'finance@vahaansaarthi.com' },
  ]

  const currentRole = roles.find(r => r.id === selectedRole)!

  const handleRoleChange = (roleId: Role) => {
    setSelectedRole(roleId)
    if (isLogin) {
      const role = roles.find(r => r.id === roleId)!
      setEmail(role.placeholder)
      setPassword('demo1234')
    }
  }

  const handleToggleMode = () => {
    const newMode = !isLogin
    setIsLogin(newMode)
    if (newMode) {
      setEmail(currentRole.placeholder)
      setPassword('demo1234')
    } else {
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Panel - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #050d1a 0%, #0a1628 100%)' }}>
        {/* Subtle background patterns */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        
        <div className="relative z-10 p-16 flex flex-col justify-between h-full">
          <Link href="/" className="flex items-center gap-2 cursor-pointer w-fit">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-bold text-2xl leading-none">V</span>
            </div>
            <span className="font-display font-bold text-2xl text-white tracking-tight">
              Vahaan Saarthi
            </span>
          </Link>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Platform Access</span>
            </div>
            <h1 className="font-display text-5xl font-bold text-white leading-tight">
              Manage Your Fleet.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Without Limits.
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-md">
              Log in to your specialized dashboard. Whether you're tracking routes, managing budgets, or ensuring compliance — we have the tools you need.
            </p>
          </div>
          
          {/* Trust strip */}
          <div className="flex gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-3xl font-display font-bold text-white">2.5k+</p>
              <p className="text-sm text-slate-400 mt-1">Fleets Managed</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-white">99.9%</p>
              <p className="text-sm text-slate-400 mt-1">Platform Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-12 justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-bold text-xl leading-none">V</span>
            </div>
            <span className="font-display font-bold text-2xl text-slate-900 tracking-tight">
              Vahaan Saarthi
            </span>
          </Link>

          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-slate-900">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-slate-500 mt-2">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Select your role and start your 30-day free trial.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Select your role</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon
                  const isSelected = selectedRole === role.id
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleChange(role.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 border ${
                        isSelected 
                          ? 'border-transparent shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                      style={isSelected ? { background: `${role.color}15`, boxShadow: `0 0 0 1px ${role.color}` } : {}}
                    >
                      <Icon className="h-5 w-5" style={{ color: isSelected ? role.color : '#64748b' }} />
                      <span className={`text-xs font-semibold ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                        {role.id}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard' }}>
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Briefcase className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Work Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder={currentRole.placeholder}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  {isLogin && (
                    <a href="#" className="text-xs font-medium text-emerald-600 hover:text-emerald-500">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg mt-2"
                style={{
                  background: `linear-gradient(135deg, ${currentRole.color}, ${currentRole.color}cc)`,
                  boxShadow: `0 8px 24px ${currentRole.color}30`,
                }}
              >
                {isLogin ? `Sign In as ${selectedRole}` : `Create ${selectedRole} Account`}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={handleToggleMode}
                  className="font-semibold text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
