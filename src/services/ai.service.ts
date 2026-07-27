/**
 * AI planning tools — provider interface with OpenAI + mock implementations.
 */

export interface DecomposedTask {
  title: string
  estimateHours: number
  priority: 'low' | 'medium' | 'high'
}

export interface ProjectPhase {
  name: string
  durationWeeks: number
  tasks: string[]
  milestone: string
}

export interface AIProvider {
  decomposeTask(description: string): Promise<DecomposedTask[]>
  generateProjectPlan(goal: string): Promise<ProjectPhase[]>
}

class MockAIProvider implements AIProvider {
  async decomposeTask(description: string): Promise<DecomposedTask[]> {
    const base = description.slice(0, 40)
    return [
      { title: `Research & requirements: ${base}...`, estimateHours: 4, priority: 'high' },
      { title: 'Design data model and API contract', estimateHours: 6, priority: 'high' },
      { title: 'Implement backend endpoints', estimateHours: 10, priority: 'medium' },
      { title: 'Build UI components', estimateHours: 8, priority: 'medium' },
      { title: 'Write tests and fix edge cases', estimateHours: 6, priority: 'medium' },
      { title: 'Code review and deploy', estimateHours: 2, priority: 'low' },
    ]
  }

  async generateProjectPlan(goal: string): Promise<ProjectPhase[]> {
    return [
      {
        name: 'Phase 1 — Discovery',
        durationWeeks: 1,
        tasks: [`Clarify scope: ${goal.slice(0, 50)}`, 'Stakeholder interviews', 'Success metrics defined'],
        milestone: 'Signed-off spec',
      },
      {
        name: 'Phase 2 — Foundation',
        durationWeeks: 2,
        tasks: ['Architecture & data model', 'CI/CD and environments', 'Design system basics'],
        milestone: 'Walking skeleton deployed',
      },
      {
        name: 'Phase 3 — Core build',
        durationWeeks: 4,
        tasks: ['Core features implementation', 'Weekly demo checkpoints', 'Integration with external services'],
        milestone: 'Feature-complete beta',
      },
      {
        name: 'Phase 4 — Launch',
        durationWeeks: 1,
        tasks: ['QA pass and bug bash', 'Performance and security review', 'Production launch'],
        milestone: 'Live in production',
      },
    ]
  }
}

class OpenAIProvider implements AIProvider {
  private async chat(system: string, user: string): Promise<string> {
    const OpenAI = (await import('openai')).default
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const res = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.4,
    })
    return res.choices[0]?.message?.content ?? ''
  }

  async decomposeTask(description: string): Promise<DecomposedTask[]> {
    const raw = await this.chat(
      'Decompose the feature into 4-8 development subtasks. Return strict JSON array: [{"title": string, "estimateHours": number, "priority": "low"|"medium"|"high"}]',
      description
    )
    return JSON.parse(raw) as DecomposedTask[]
  }

  async generateProjectPlan(goal: string): Promise<ProjectPhase[]> {
    const raw = await this.chat(
      'Create a project plan with 3-5 phases. Return strict JSON array: [{"name": string, "durationWeeks": number, "tasks": string[], "milestone": string}]',
      goal
    )
    return JSON.parse(raw) as ProjectPhase[]
  }
}

export function getAIProvider(): AIProvider {
  return process.env.OPENAI_API_KEY ? new OpenAIProvider() : new MockAIProvider()
}
