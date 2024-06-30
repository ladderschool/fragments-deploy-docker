import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($chatroomId: Int!, $input: CreateMessageInput!) {
    createMessage(chatroomId: $chatroomId, input: $input) {
      ...MessageInfo
    }
  }
`

const MessageCreate = () => {
  const [createMessage] = useMutation(CREATE_MESSAGE, {
    onCompleted: (data) => {
      toast.success(data.createMessage.id + ' created')
    },
    onError: (error) => {
      toast.error('Unable to create message. Error: ' + error.message)
    },
  })

  const handleClick = () => {
    createMessage({
      variables: {
        chatroomId: 1, // Example chatroom for demo
        input: {
          content: 'This is a test message',
        },
      },
    })
  }

  return (
    <div>
      <button onClick={handleClick}>Create Message</button>
    </div>
  )
}

export default MessageCreate
