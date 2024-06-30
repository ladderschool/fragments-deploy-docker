import { render } from '@redwoodjs/testing/web'

import Messages from './Messages'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Messages', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Messages />)
    }).not.toThrow()
  })
})
