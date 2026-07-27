/**
 * Seed script — workspace, users, project with columns and tasks, activity.
 * Usage: npm run db:seed  (requires SUPABASE_SERVICE_ROLE_KEY)
 */
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const db = createClient(url, key)

async function seed() {
  console.log('Seeding Flowboard...')

  const { data: ws, error: wErr } = await db
    .from('workspaces').insert({ name: 'Product Team' }).select().single()
  if (wErr) throw wErr

  const { data: users, error: uErr } = await db.from('users').insert([
    { email: 'demo@example.com', full_name: 'Demo Admin', role: 'admin', workspace_id: ws.id },
    { email: 'alex@company.com', full_name: 'Alex Kim', role: 'member', workspace_id: ws.id },
    { email: 'nina@company.com', full_name: 'Nina Ivanova', role: 'member', workspace_id: ws.id },
  ]).select()
  if (uErr) throw uErr

  const { data: project, error: pErr } = await db.from('projects')
    .insert({ workspace_id: ws.id, name: 'Web App Redesign', description: 'New design system rollout', status: 'on_track', due_date: '2026-09-15' })
    .select().single()
  if (pErr) throw pErr

  const { data: columns, error: cErr } = await db.from('columns').insert(
    ['Backlog', 'In Progress', 'Review', 'Done'].map((name, i) => ({ project_id: project.id, name, position: i }))
  ).select()
  if (cErr) throw cErr

  const col = (name: string) => columns.find((c) => c.name === name)!.id
  const user = (name: string) => users.find((u) => u.full_name === name)!.id

  const { data: tasks, error: tErr } = await db.from('tasks').insert([
    { project_id: project.id, column_id: col('In Progress'), title: 'Billing page redesign', assignee_id: user('Nina Ivanova'), priority: 'high', due_date: '2026-07-30', position: 0, labels: ['design', 'frontend'] },
    { project_id: project.id, column_id: col('In Progress'), title: 'Webhook retry mechanism', assignee_id: user('Alex Kim'), priority: 'high', due_date: '2026-07-29', position: 1, labels: ['backend'] },
    { project_id: project.id, column_id: col('Backlog'), title: 'Design onboarding email sequence', priority: 'medium', position: 0, labels: ['marketing'] },
    { project_id: project.id, column_id: col('Done'), title: 'Fix mobile nav overflow', assignee_id: user('Nina Ivanova'), priority: 'medium', position: 0, labels: ['frontend', 'bug'] },
  ]).select()
  if (tErr) throw tErr

  const { error: sErr } = await db.from('subtasks').insert([
    { task_id: tasks[0].id, title: 'Audit current page', done: true },
    { task_id: tasks[0].id, title: 'New layout in Figma', done: true },
    { task_id: tasks[0].id, title: 'Implement components', done: false },
    { task_id: tasks[0].id, title: 'QA on mobile', done: false },
  ])
  if (sErr) throw sErr

  const { error: cmErr } = await db.from('comments').insert([
    { task_id: tasks[0].id, user_id: user('Alex Kim'), body: 'Should we keep the old invoice table layout?' },
    { task_id: tasks[0].id, user_id: user('Nina Ivanova'), body: 'No — new table matches the design system now.' },
  ])
  if (cmErr) throw cmErr

  const { error: aErr } = await db.from('activity_log').insert([
    { workspace_id: ws.id, user_id: user('Nina Ivanova'), action: 'task.moved', entity: 'task', entity_id: tasks[3].id, meta: { to: 'Done' } },
    { workspace_id: ws.id, user_id: user('Alex Kim'), action: 'comment.created', entity: 'task', entity_id: tasks[0].id },
  ])
  if (aErr) throw aErr

  console.log('Seed complete: 1 workspace, 3 users, 1 project, 4 columns, 4 tasks, 4 subtasks, 2 comments, activity log')
  console.log('Demo login: demo@example.com / Demo123! (create in Supabase Auth dashboard)')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
