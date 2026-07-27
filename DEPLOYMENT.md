# Deployment — Flowboard

1. **Supabase**: проект → SQL Editor → `sql/schema.sql` → Auth → `demo@example.com` / `Demo123!`
2. **Seed**: `.env.local` → `npm run db:seed`
3. **Vercel**: import → env vars (Supabase + опц. `OPENAI_API_KEY`) → Deploy
4. **Проверка**: `/board` (перетащить карточку между колонками), `/planner` (Decompose и Generate Plan отвечают в mock mode), `/team` (графики рисуются)
