# Case Study: Flowboard — Project Management SaaS

## Краткое описание
PM-инструмент: kanban с drag-and-drop, задачи с подзадачами/комментариями/метками, activity log, аналитика команды и AI Planner (декомпозиция фич, генерация project plan).

## Проблема клиента
Агентство из 15 человек жило в тяжёлом энтерпрайз-инструменте: команда его саботировала, планирование фич занимало целые встречи, нагрузка распределялась вслепую.

## Решение
Лёгкий и быстрый инструмент: доска, где всё делается перетаскиванием; AI разбивает фичу на подзадачи с оценками за секунды; velocity и workload видны без выгрузок.

## Моя роль
Full-stack: модель данных (workspace → projects → columns → tasks → subtasks/comments), DnD-доска, AI-слой, аналитика, деплой.

## Технологии
Next.js 15, React 19, TypeScript, Tailwind, Supabase, OpenAI (mock-first), Recharts.

## Архитектурные решения
- **Позиционная модель** tasks(column_id, position) с индексом — порядок карточек хранится в БД, DnD-перестановки дешёвые.
- **Labels как JSONB** — гибкие метки без join-таблицы на старте, с прозрачным путём миграции.
- **Activity log на уровне схемы** — событие пишется при каждом значимом действии.
- **Guest-роль в RLS** — клиенты агентства видят проект, но не редактируют.

## Результаты (ожидаемые)
- Планирование фичи: часовая встреча → 5 минут с AI-декомпозицией
- Перекосы нагрузки видны на графике до выгорания
- Клиентам можно дать guest-доступ вместо статус-звонков

## Тексты

**GitHub About:** Project management SaaS — drag-and-drop kanban, subtasks & comments, team velocity analytics, AI feature decomposition & project plan generation. Next.js 15 + Supabase.
**Topics:** `nextjs` `typescript` `supabase` `kanban` `project-management` `openai` `saas`

**LinkedIn:** 📋 Построил PM-инструмент Flowboard: kanban на нативном DnD с позиционной моделью в PostgreSQL, AI-декомпозиция фич в подзадачи с оценками, генерация project plan по цели, velocity-аналитика. Linear-вдохновлённый дизайн. Next.js 15 + Supabase.

**Upwork:** I built a project management SaaS (Next.js 15, Supabase): kanban boards with drag-and-drop and DB-backed ordering, tasks with subtasks/comments/labels, team analytics (velocity, workload), and AI planning tools (feature decomposition, phased project plans). Fast, clean, and deployable in minutes.

**Резюме:** Flowboard (Next.js 15, Supabase, OpenAI) — PM SaaS с DnD-kanban, позиционной моделью задач и AI-планированием.
