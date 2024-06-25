import type { Prisma, Message } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MessageCreateArgs>({
  message: {
    one: { data: { content: 'String' } },
    two: { data: { content: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Message, 'message'>
