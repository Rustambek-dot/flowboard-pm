'use client'

import Link from 'next/link'
import { Kanban, MessageSquare, Sparkles, Activity, Users, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Gradient blobs */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="fixed top-60 -left-40 w-96 h-96 bg-fuchsia-200 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="container-app flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
              FB
            </div>
            <span className="font-bold text-lg">Flowboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-slate-600 hover:text-primary-600 font-medium">Sign In</Link>
            <Link href="/auth/register" className="btn-primary">Start Free</Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 container-app text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Ship projects, <span className="text-primary-600">not chaos</span>
        </h1>
        <p className="text-xl text-slate-500 mb-8 max-w-2xl mx-auto">
          Fast kanban boards, tasks with subtasks and comments, team analytics — and AI that
          breaks features into subtasks and drafts your project plan.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register" className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
            Start Free
          </Link>
          <Link href="/auth/login" className="px-8 py-3 border border-slate-200 rounded-lg font-semibold hover:border-primary-300 transition-colors">
            Live Demo
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20 text-left">
          {[
            { icon: Kanban, title: 'Boards that fly', text: 'Drag-and-drop kanban with filters by assignee and label.' },
            { icon: Sparkles, title: 'AI decomposition', text: 'Paste a feature — get subtasks with estimates in seconds.' },
            { icon: Zap, title: 'AI project plans', text: 'A goal in, a phased plan with milestones out.' },
            { icon: MessageSquare, title: 'Context stays put', text: 'Subtasks, comments, and files live on the task.' },
            { icon: Activity, title: 'Activity log', text: 'Every change tracked — who, what, when.' },
            { icon: Users, title: 'Team analytics', text: 'Velocity and workload balance without spreadsheets.' },
          ].map((f) => (
            <div key={f.title} className="card p-6 bg-white/80 backdrop-blur">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary-700" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10 text-center text-slate-400 text-sm relative">
        © 2026 Flowboard
      </footer>
    </div>
  )
}
