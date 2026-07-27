import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getAIProvider } from '@/services/ai.service'

const bodySchema = z.object({ goal: z.string().min(5).max(4000) })

export async function POST(req: NextRequest) {
  try {
    const parsed = bodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    const plan = await getAIProvider().generateProjectPlan(parsed.data.goal)
    return NextResponse.json({ data: plan })
  } catch (error) {
    console.error('Project plan error:', error)
    return NextResponse.json({ error: 'Plan generation failed' }, { status: 500 })
  }
}
