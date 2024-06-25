import { Metadata } from '@redwoodjs/web'

import MessagesCell from 'src/components/MessagesCell'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <div>
        <MessagesCell />
      </div>
    </>
  )
}

export default HomePage
