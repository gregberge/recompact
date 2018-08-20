import { Dummy } from './utils'
import { identity } from '..'

describe('identity', () => {
  it('should return the same component', () => {
    const NewDummy = identity(Dummy)
    expect(NewDummy).toBe(Dummy)
  })
})
