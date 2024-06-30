import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import MessageCreate from 'src/components/MessageCreate/MessageCreate'
import MessagesCell from 'src/components/MessagesCell'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <Toaster />
      <MessagesCell />
      <div>
        <h1>Create a message</h1>
        <MessageCreate />
      </div>
    </>
  )
}

export default HomePage
