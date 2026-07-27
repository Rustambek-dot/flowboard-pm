'use client'

import { useState } from 'react'
import { Building2, Users, Tags } from 'lucide-react'

const tabs = [
  { key: 'workspace', label: 'Workspace', icon: Building2 },
  { key: 'members', label: 'Members', icon: Users },
  { key: 'labels', label: 'Labels', icon: Tags },
] as const

type TabKey = (typeof tabs)[number]['key']

export default function SettingsPage() {
  const [tab, setTab] = useState<TabKey>('workspace')
  const [labels, setLabels] = useState(['frontend', 'backend', 'design', 'marketing', 'bug', 'tech-debt'])
  const [newLabel, setNewLabel] = useState('')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.key
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'workspace' && (
        <div className="card p-6 max-w-xl space-y-4">
          <div><label className="label">Workspace name</label><input className="input-base" defaultValue="Product Team" /></div>
          <div><label className="label">Default board columns</label><input className="input-base" defaultValue="Backlog, In Progress, Review, Done" /></div>
          <button className="btn-primary">Save</button>
        </div>
      )}

      {tab === 'members' && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-left text-slate-500">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Demo Admin', email: 'demo@example.com', role: 'admin' },
                { name: 'Alex Kim', email: 'alex@company.com', role: 'member' },
                { name: 'Nina Ivanova', email: 'nina@company.com', role: 'member' },
                { name: 'Guest Reviewer', email: 'guest@client.com', role: 'guest' },
              ].map((m) => (
                <tr key={m.email} className="border-b border-slate-100 dark:border-slate-800/50">
                  <td className="px-5 py-3 font-medium">{m.name}</td>
                  <td className="px-5 py-3 text-slate-500">{m.email}</td>
                  <td className="px-5 py-3"><span className="badge-primary capitalize">{m.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'labels' && (
        <div className="card p-6 max-w-xl space-y-4">
          <div className="flex flex-wrap gap-2">
            {labels.map((l) => <span key={l} className="badge-primary">{l}</span>)}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); if (newLabel) { setLabels((p) => [...p, newLabel]); setNewLabel('') } }}
            className="flex gap-2"
          >
            <input className="input-base" placeholder="New label..." value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
            <button type="submit" className="btn-primary shrink-0">Add</button>
          </form>
        </div>
      )}
    </div>
  )
}
