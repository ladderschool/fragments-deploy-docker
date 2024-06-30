import { render } from '@redwoodjs/testing/web'

import MessageCreate from './MessageCreate'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MessageCreate', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MessageCreate />)
    }).not.toThrow()
  })
})
