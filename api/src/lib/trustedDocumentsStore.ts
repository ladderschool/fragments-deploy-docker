export const store = {
  a7447be69101e84ed6ba290f14f4a576e834193d:
    'fragment MessageInfo on Message { __typename content createdAt id updatedAt viewed } mutation CreateMessage($chatroomId: Int!, $input: CreateMessageInput!) { __typename createMessage(chatroomId: $chatroomId, input: $input) { __typename ...MessageInfo } }',
  '77bdf982748e1b76392776b1a0ae7340da4872b1':
    'fragment MessageInfo on Message { __typename content createdAt id updatedAt viewed } query MessagesQuery { __typename messages { __typename ...MessageInfo } }',
  c577b60ac819ea2edf2aad807e74b1372754e8b8:
    'fragment MessageInfo on Message { __typename content createdAt id updatedAt viewed } subscription ListenForNewMessages($chatroomId: Int!) { newMessage(chatroomId: $chatroomId) { __typename ...MessageInfo } }',
}
