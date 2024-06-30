import { useEffect, useContext } from 'react'

import { Message } from 'types/graphql'

import { MessageContext } from 'src/context/MessageContext'

const Messages = ({ messages }) => {
  const { history, addToHistory } = useContext(MessageContext)

  useEffect(() => {
    if (history.length === 0 && messages?.length > 0) {
      messages.map((message: Message) => {
        addToHistory(message)
      })
    }
  }, [])

  return (
    <ul>
      {history?.map((message) => {
        return <li key={message.id}>{message.content}</li>
      })}
    </ul>
  )
}

export default Messages
