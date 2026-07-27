# Flowboard — Project Management SaaS — Product Specification

## Обзор
**Flowboard** — управление проектами: рабочие пространства, kanban-доски с drag-and-drop, задачи с подзадачами/комментариями/метками, activity log, аналитика команды, AI-декомпозиция задач и генерация project plan.

## Целевая аудитория
Продуктовые и агентские команды 3–50 человек, уставшие от тяжёлых энтерпрайз-инструментов.

## Роли
- **Workspace Admin** — всё в workspace
- **Member** — задачи, доски, комментарии
- **Guest** — только просмотр назначенных проектов

## Ключевые user flows
1. **Задача**: создать в колонке → назначить исполнителя, приоритет, метки, срок → подзадачи → комментарии → activity log пишется автоматически
2. **Доска**: drag-and-drop задач между колонками (Backlog → In Progress → Review → Done)
3. **AI-декомпозиция**: описание фичи → AI разбивает на подзадачи с оценками
4. **AI project plan**: цель проекта → AI генерирует фазы с задачами и вехами

## Страницы
- `/`, `/auth/*`
- `/dashboard` — мои задачи, дедлайны недели, активность команды, прогресс проектов
- `/board` — kanban с DnD, фильтры по исполнителю/метке
- `/projects` — список проектов с прогрессом и статусами
- `/team` — аналитика: velocity, распределение нагрузки, закрытые задачи
- `/planner` — AI-декомпозиция + AI project plan
- `/settings` — workspace, участники, метки

## База данных
workspaces, users, projects (id, workspace_id, name, status, due_date)
columns (id, project_id, name, position)
tasks (id, project_id, column_id, title, description, assignee_id, priority, due_date, position, labels JSONB)
subtasks (id, task_id, title, done)
comments (id, task_id, user_id, body)
activity_log (id, workspace_id, user_id, action, entity, meta JSONB)
+ RLS по workspace, индексы tasks(column_id, position)

## Дизайн-система (отлична от 1–7)
- Палитра: **violet** (primary #7c3aed), светлый лендинг с градиентными пятнами
- Компактные task-карточки с метками-чипами и аватарами
- Лёгкость и скорость в духе Linear
