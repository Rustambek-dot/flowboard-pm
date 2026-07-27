'use client'

import { useMemo, useState } from 'react'
import { GripVertical, MessageSquare, CheckSquare } from 'lucide-react'
import { getInitials, formatDate } from '@/lib/utils'

type ColumnKey = 'backlog' | 'in_progress' | 'review' | 'done'

interface BoardTask {
  id: string
  title: string
  assignee: string
  priority: 'low' | 'medium' | 'high'
  due?: string
  labels: string[]
  comments: number
  subtasksDone: number
  subtasksTotal: number
}

const columnConfig: { key: ColumnKey; label: string; accent: string }[] = [
  { key: 'backlog', label: 'Backlog', accent: 'border-slate-400' },
  { key: 'in_progress', label: 'In Progress', accent: 'border-primary-500' },
  { key: 'review', label: 'Review', accent: 'border-warning' },
  { key: 'done', label: 'Done', accent: 'border-success' },
]

const initialTasks: Record<ColumnKey, BoardTask[]> = {
  backlog: [
    { id: 't1', title: 'Design onboarding email sequence', assignee: 'Dana Wu', priority: 'medium', due: '2026-08-05', labels: ['marketing'], comments: 2, subtasksDone: 0, subtasksTotal: 3 },
    { id: 't2', title: 'Spike: migrate to server components', assignee: 'Alex Kim', priority: 'low', labels: ['tech-debt'], comments: 0, subtasksDone: 0, subtasksTotal: 0 },
  ],
  in_progress: [
    { id: 't3', title: 'Billing page redesign', assignee: 'Nina Ivanova', priority: 'high', due: '2026-07-30', labels: ['design', 'frontend'], comments: 5, subtasksDone: 2, subtasksTotal: 4 },
    { id: 't4', title: 'Webhook retry mechanism', assignee: 'Ilya Petrov', priority: 'high', due: '2026-07-29', labels: ['backend'], comments: 3, subtasksDone: 1, subtasksTotal: 3 },
  ],
  review: [
    { id: 't5', title: 'Export to CSV for reports', assignee: 'Alex Kim', priority: 'medium', labels: ['backend'], comments: 1, subtasksDone: 3, subtasksTotal: 3 },
  ],
  done: [
    { id: 't6', title: 'Fix mobile nav overflow', assignee: 'Nina Ivanova', priority: 'medium', labels: ['frontend', 'bug'], comments: 4, subtasksDone: 2, subtasksTotal: 2 },
  ],
}

const priorityDot = { high: 'bg-danger', medium: 'bg-warning', low: 'bg-slate-400' }

const labelColors: Record<string, string> = {
  frontend: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  backend: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  design: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  marketing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  bug: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  'tech-debt': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

export default function BoardPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [dragged, setDragged] = useState<{ task: BoardTask; from: ColumnKey } | null>(null)
  const [assigneeFilter, setAssigneeFilter] = useState('all')

  const assignees = useMemo(
    () => ['all', ...Array.from(new Set(Object.values(initialTasks).flat().map((t) => t.assignee)))],
    []
  )

  const handleDrop = (to: ColumnKey) => {
    if (!dragged || dragged.from === to) return
    setTasks((prev) => ({
      ...prev,
      [dragged.from]: prev[dragged.from].filter((t) => t.id !== dragged.task.id),
      [to]: [...prev[to], dragged.task],
    }))
    setDragged(null)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Product Board</h1>
        <div className="flex gap-2">
          <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)} className="input-base w-44">
            {assignees.map((a) => <option key={a} value={a}>{a === 'all' ? 'All assignees' : a}</option>)}
          </select>
          <button className="btn-primary">New Task</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {columnConfig.map((col) => {
          const colTasks = tasks[col.key].filter(
            (t) => assigneeFilter === 'all' || t.assignee === assigneeFilter
          )
          return (
            <div
              key={col.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.key)}
              className={`card border-t-4 ${col.accent} p-3 min-h-[240px]`}
            >
              <div className="flex items-center justify-between px-1 mb-3">
                <span className="font-semibold text-sm">{col.label}</span>
                <span className="text-xs text-slate-500">{colTasks.length}</span>
              </div>
              <div className="space-y-2">
                {colTasks.map((task) => {
                  const [first, last] = task.assignee.split(' ')
                  return (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => setDragged({ task, from: col.key })}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:shadow-sm"
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${priorityDot[task.priority]}`} />
                            <span className="font-medium text-sm leading-snug">{task.title}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {task.labels.map((l) => (
                              <span key={l} className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${labelColors[l] ?? 'bg-slate-100 text-slate-600'}`}>
                                {l}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              {task.comments > 0 && (
                                <span className="flex items-center gap-0.5"><MessageSquare className="w-3 h-3" />{task.comments}</span>
                              )}
                              {task.subtasksTotal > 0 && (
                                <span className="flex items-center gap-0.5"><CheckSquare className="w-3 h-3" />{task.subtasksDone}/{task.subtasksTotal}</span>
                              )}
                              {task.due && <span>{formatDate(task.due)}</span>}
                            </div>
                            <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
                              {getInitials(first, last ?? '')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {colTasks.length === 0 && (
                  <div className="text-center text-xs text-slate-400 py-6">Drop tasks here</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
