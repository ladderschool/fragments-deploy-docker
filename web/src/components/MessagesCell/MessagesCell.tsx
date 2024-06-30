import type { MessagesQuery, MessagesQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Messages from 'src/components/Messages/Messages'
import MessageProvider from 'src/context/MessageContext'
export const QUERY: TypedDocumentNode<
  MessagesQuery,
  MessagesQueryVariables
> = gql`
  query MessagesQuery {
    messages {
      ...MessageInfo
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ messages }: CellSuccessProps<MessagesQuery>) => {
  return (
    <MessageProvider>
      <Messages messages={messages} />
    </MessageProvider>
  )
}
