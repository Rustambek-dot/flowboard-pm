'use client'

import { CheckCircle2, Clock, AlertTriangle, Activity } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const myTasks = [
  { title: 'Billing page redesign', project: 'Web App', due: '2026-07-30', priority: 'high' },
  { title: 'Webhook retry mechanism', project: 'API', due: '2026-07-29', priority: 'high' },
  { title: 'Design onboarding emails', project: 'Growth', due: '2026-08-05', priority: 'medium' },
]

const projects = [
  { name: 'Web App Redesign', progress: 68, status: 'on_track' },
  { name: 'API v2', progress: 41, status: 'at_risk' },
  { name: 'Growth Experiments', progress: 85, status: 'on_track' },
]

const activity = [
  { who: 'Nina Ivanova', what: 'moved "Fix mobile nav overflow" to Done', when: '12 min ago' },
  { who: 'Ilya Petrov', what: 'commented on "Webhook retry mechanism"', when: '48 min ago' },
  { who: 'Alex Kim', what: 'created task "Spike: server components"', when: '2 h ago' },
  { who: 'Dana Wu', what: 'added label marketing to "Onboarding emails"', when: '3 h ago' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'My open tasks', value: '7', icon: Clock },
          { label: 'Due this week', value: '3', icon: AlertTriangle },
          { label: 'Completed (7d)', value: '12', icon: CheckCircle2 },
          { label: 'Team activity (24h)', value: '38', icon: Activity },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">{s.label}</span>
              <s.icon className="w-5 h-5 text-primary-500" />
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-semibold mb-3">My Tasks</h2>
            <div className="space-y-2">
              {myTasks.map((t) => (
                <div key={t.title} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div>
                    <div className="font-medium text-sm">{t.title}</div>
                    <div className="text-xs text-slate-500">{t.project}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={t.priority === 'high' ? 'badge-danger' : 'badge-warning'}>{t.priority}</span>
                    <span className="text-xs text-slate-500">{formatDate(t.due)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-semibold mb-3">Projects</h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{p.name}</span>
                    <span className={p.status === 'at_risk' ? 'text-warning font-medium' : 'text-slate-500'}>
                      {p.progress}%{p.status === 'at_risk' && ' · at risk'}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${p.status === 'at_risk' ? 'bg-warning' : 'bg-primary-500'}`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-5 h-fit">
          <h2 className="font-semibold mb-3">Recent Activity</h2>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-medium">{a.who}</span>{' '}
                  <span className="text-slate-600 dark:text-slate-400">{a.what}</span>
                  <div className="text-xs text-slate-400 mt-0.5">{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
