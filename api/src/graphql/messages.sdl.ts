export const schema = gql`
  type Message {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    viewed: Boolean!
    content: String!
  }

  type Query {
    messages: [Message!]! @skipAuth
    message(id: Int!): Message @skipAuth
  }

  input CreateMessageInput {
    viewed: Boolean
    content: String!
  }

  input UpdateMessageInput {
    viewed: Boolean
    content: String
  }

  type Mutation {
    createMessage(chatroomId: Int!, input: CreateMessageInput!): Message!
      @skipAuth
    updateMessage(id: Int!, input: UpdateMessageInput!): Message! @skipAuth
    deleteMessage(id: Int!): Message! @skipAuth
  }
`
