export const schema = gql`
  type Message {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    viewed: Boolean!
    content: String!
  }

  type Query {
    messages: [Message!]! @requireAuth
    message(id: Int!): Message @requireAuth
  }

  input CreateMessageInput {
    viewed: Boolean!
    content: String!
  }

  input UpdateMessageInput {
    viewed: Boolean
    content: String
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): Message! @requireAuth
    updateMessage(id: Int!, input: UpdateMessageInput!): Message! @requireAuth
    deleteMessage(id: Int!): Message! @requireAuth
  }
`
