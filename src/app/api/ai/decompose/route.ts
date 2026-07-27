import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getAIProvider } from '@/services/ai.service'

const bodySchema = z.object({ description: z.string().min(5).max(4000) })

export async function POST(req: NextRequest) {
  try {
    const parsed = bodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    const tasks = await getAIProvider().decomposeTask(parsed.data.description)
    return NextResponse.json({ data: tasks })
  } catch (error) {
    console.error('Decompose error:', error)
    return NextResponse.json({ error: 'Decomposition failed' }, { status: 500 })
  }
}
