'use client'

import { useState } from 'react'
import { Sparkles, ListTree, Map, Loader2 } from 'lucide-react'
import type { DecomposedTask, ProjectPhase } from '@/services/ai.service'

export default function PlannerPage() {
  const [feature, setFeature] = useState('Add team billing with seat-based pricing and invoices')
  const [goal, setGoal] = useState('Launch a public API with documentation portal in Q4')
  const [tasks, setTasks] = useState<DecomposedTask[]>([])
  const [plan, setPlan] = useState<ProjectPhase[]>([])
  const [loading, setLoading] = useState<'decompose' | 'plan' | null>(null)
  const [error, setError] = useState('')

  const call = async (kind: 'decompose' | 'plan') => {
    setLoading(kind)
    setError('')
    try {
      const url = kind === 'decompose' ? '/api/ai/decompose' : '/api/ai/project-plan'
      const body = kind === 'decompose' ? { description: feature } : { goal }
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Request failed')
      if (kind === 'decompose') setTasks(json.data)
      else setPlan(json.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary-500" /> AI Planner
        </h1>
        <p className="text-sm text-slate-500 mt-1">Works in mock mode without an OpenAI key.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">{error}</div>
      )}

      {/* Task decomposition */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <ListTree className="w-4 h-4 text-primary-500" /> Feature → Subtasks
        </h2>
        <textarea
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
          rows={2}
          className="input-base resize-none"
          placeholder="Describe a feature..."
        />
        <button onClick={() => call('decompose')} disabled={loading !== null} className="btn-primary flex items-center gap-2">
          {loading === 'decompose' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Decompose
        </button>

        {tasks.length > 0 && (
          <div className="space-y-2">
            {tasks.map((t) => (
              <div key={t.title} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <span className="text-sm font-medium">{t.title}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={t.priority === 'high' ? 'badge-danger' : t.priority === 'medium' ? 'badge-warning' : 'badge-primary'}>
                    {t.priority}
                  </span>
                  <span className="text-xs text-slate-500 w-10 text-right">{t.estimateHours}h</span>
                </div>
              </div>
            ))}
            <div className="text-right text-sm text-slate-500">
              Total estimate: <span className="font-semibold">{tasks.reduce((s, t) => s + t.estimateHours, 0)}h</span>
            </div>
          </div>
        )}
      </div>

      {/* Project plan */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Map className="w-4 h-4 text-primary-500" /> Goal → Project Plan
        </h2>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={2}
          className="input-base resize-none"
          placeholder="Describe the project goal..."
        />
        <button onClick={() => call('plan')} disabled={loading !== null} className="btn-primary flex items-center gap-2">
          {loading === 'plan' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Generate Plan
        </button>

        {plan.length > 0 && (
          <div className="space-y-3">
            {plan.map((phase, i) => (
              <div key={phase.name} className="relative pl-6">
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary-500" />
                {i < plan.length - 1 && <div className="absolute left-[5px] top-5 bottom-[-12px] w-0.5 bg-primary-200 dark:bg-primary-900" />}
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{phase.name}</span>
                    <span className="text-xs text-slate-500">{phase.durationWeeks} wk</span>
                  </div>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-0.5 mb-2">
                    {phase.tasks.map((t) => <li key={t}>• {t}</li>)}
                  </ul>
                  <div className="text-xs font-medium text-primary-600 dark:text-primary-400">
                    🏁 {phase.milestone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
