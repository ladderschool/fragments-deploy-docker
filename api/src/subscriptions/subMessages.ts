import gql from 'graphql-tag'

import type { PubSub } from '@redwoodjs/realtime'

export const schema = gql`
  type Subscription {
    newMessage(chatroomId: Int!): Message! @skipAuth
  }
`

export type MessageChannel = {
  newMessage: [
    chatroomId: number,
    payload: {
      id: number
      createdAt: Date
      updatedAt: Date
      content: string
      viewed: boolean
    }
  ]
}

export type MessageChannelType = PubSub<MessageChannel>

const subMessage = {
  newMessage: {
    subscribe: (
      _,
      { chatroomId },
      { pubSub }: { pubSub: MessageChannelType }
    ) => {
      return pubSub.subscribe('newMessage', chatroomId)
    },
    resolve: (payload) => {
      return payload
    },
  },
}

export default subMessage
