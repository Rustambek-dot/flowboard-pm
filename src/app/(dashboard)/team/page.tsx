'use client'

import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { getInitials } from '@/lib/utils'

const velocity = [
  { sprint: 'S18', points: 21 }, { sprint: 'S19', points: 26 }, { sprint: 'S20', points: 24 },
  { sprint: 'S21', points: 31 }, { sprint: 'S22', points: 29 }, { sprint: 'S23', points: 34 },
]

const workload = [
  { name: 'Alex Kim', open: 6, done: 12 },
  { name: 'Nina Ivanova', open: 8, done: 9 },
  { name: 'Ilya Petrov', open: 5, done: 14 },
  { name: 'Dana Wu', open: 3, done: 7 },
]

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Team Analytics</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Velocity (avg)', value: '27.5 pts' },
          { label: 'Tasks closed (30d)', value: '42' },
          { label: 'Avg cycle time', value: '2.8 days' },
          { label: 'Overdue tasks', value: '4' },
        ].map((k) => (
          <div key={k.label} className="card p-5">
            <div className="text-sm text-slate-500 mb-1">{k.label}</div>
            <div className="text-2xl font-bold">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="font-semibold mb-4">Velocity by Sprint</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={velocity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#33415530" />
              <XAxis dataKey="sprint" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="points" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold mb-4">Workload Balance</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={workload} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#33415530" />
              <XAxis type="number" stroke="#64748b" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} width={100} />
              <Tooltip />
              <Bar dataKey="open" stackId="a" fill="#a78bfa" name="Open" />
              <Bar dataKey="done" stackId="a" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Done (30d)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold mb-4">Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workload.map((m) => {
            const [first, last] = m.name.split(' ')
            return (
              <div key={m.name} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
                  {getInitials(first, last ?? '')}
                </div>
                <div>
                  <div className="font-medium text-sm">{m.name}</div>
                  <div className="text-xs text-slate-500">{m.open} open · {m.done} done</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
