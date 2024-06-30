import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { MessageChannelType } from 'src/subscriptions/subMessages'

export const messages: QueryResolvers['messages'] = () => {
  return db.message.findMany()
}

export const message: QueryResolvers['message'] = ({ id }) => {
  return db.message.findUnique({
    where: { id },
  })
}

export const createMessage: MutationResolvers['createMessage'] = async ({
  chatroomId,
  input,
}) => {
  // Create the message in the database
  const message = await db.message.create({
    data: input,
  })

  // Create and publish the message for each user in the chatroom
  if (message) {
    const pubSub = context.pubSub as MessageChannelType
    pubSub.publish('newMessage', chatroomId, message)
  }

  return message
}

export const updateMessage: MutationResolvers['updateMessage'] = ({
  id,
  input,
}) => {
  return db.message.update({
    data: input,
    where: { id },
  })
}

export const deleteMessage: MutationResolvers['deleteMessage'] = ({ id }) => {
  return db.message.delete({
    where: { id },
  })
}
