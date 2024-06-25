import { registerFragment } from '@redwoodjs/web/apollo'

registerFragment(
  gql`
    fragment MessageInfo on Message {
      id
      viewed
      createdAt
      updatedAt
      content
    }
  `
)
