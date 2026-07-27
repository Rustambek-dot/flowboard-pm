'use client'

import { useState } from 'react'
import { Plus, FolderKanban, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ProjectRow {
  id: string
  name: string
  description: string
  progress: number
  tasksDone: number
  tasksTotal: number
  due: string
  status: 'on_track' | 'at_risk' | 'completed'
}

const initial: ProjectRow[] = [
  { id: 'p1', name: 'Web App Redesign', description: 'New design system rollout across the app', progress: 68, tasksDone: 27, tasksTotal: 40, due: '2026-09-15', status: 'on_track' },
  { id: 'p2', name: 'API v2', description: 'Versioned public API with webhooks', progress: 41, tasksDone: 13, tasksTotal: 32, due: '2026-08-30', status: 'at_risk' },
  { id: 'p3', name: 'Growth Experiments', description: 'Q3 activation and retention experiments', progress: 85, tasksDone: 17, tasksTotal: 20, due: '2026-08-10', status: 'on_track' },
  { id: 'p4', name: 'Mobile MVP', description: 'React Native companion app', progress: 100, tasksDone: 24, tasksTotal: 24, due: '2026-06-30', status: 'completed' },
]

const statusBadge = {
  on_track: 'badge-success',
  at_risk: 'badge-warning',
  completed: 'badge-primary',
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', due: '' })

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    setProjects((prev) => [
      { id: crypto.randomUUID(), name: form.name, description: form.description, progress: 0, tasksDone: 0, tasksTotal: 0, due: form.due, status: 'on_track' },
      ...prev,
    ])
    setShowForm(false)
    setForm({ name: '', description: '', due: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={add} className="card p-5 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-48"><label className="label">Name</label><input className="input-base" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="flex-1 min-w-48"><label className="label">Description</label><input className="input-base" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div><label className="label">Due date</label><input className="input-base" type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} /></div>
          <button type="submit" className="btn-primary">Create</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="card p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-slate-500">{p.description}</div>
                </div>
              </div>
              <span className={statusBadge[p.status]}>{p.status.replace('_', ' ')}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden my-3">
              <div
                className={`h-full rounded-full ${p.status === 'at_risk' ? 'bg-warning' : 'bg-primary-500'}`}
                style={{ width: `${p.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{p.tasksDone}/{p.tasksTotal} tasks · {p.progress}%</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{p.due && formatDate(p.due)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
