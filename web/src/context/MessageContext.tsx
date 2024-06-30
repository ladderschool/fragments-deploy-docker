import React, { useState, useEffect } from 'react'

import { Message } from 'types/graphql'

import { useSubscription } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription ListenForNewMessages($chatroomId: Int!) {
    newMessage(chatroomId: $chatroomId) {
      ...MessageInfo
    }
  }
`

interface MessageContext {
  history: Message[]
  addToHistory: (message: Message) => void
}

export const MessageContext = React.createContext<MessageContext>({
  history: [],
  addToHistory: () => {},
})

interface MessageProviderProps {
  children: React.ReactNode
}

const MessageProvider = ({ children }: MessageProviderProps) => {
  const [history, setHistory] = useState([])

  const { data, error } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { chatroomId: 1 }, // Just an example chatroom for demo
  })

  useEffect(() => {
    if (error) {
      toast.error('Unable to update latest messages: ' + error)
    }
  }, [error])

  useEffect(() => {
    if (data) {
      addToHistory(data.newMessage)
    }
  }, [data])

  const addToHistory = (message: Message) => {
    setHistory((prevHistory) => [message, ...prevHistory])
  }

  // Create the context value to use down the tree
  const contextValue: MessageContext = {
    history,
    addToHistory: addToHistory,
  }

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider
