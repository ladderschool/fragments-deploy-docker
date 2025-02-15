import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { realtime } from 'src/lib/realtime'
import { store } from 'src/lib/trustedDocumentsStore'

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  realtime,

  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },

  trustedDocuments: {
    store,
  },
})
