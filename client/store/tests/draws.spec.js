import { expect } from 'chai'
import { addDraws } from '../draws.js'

describe('Store: draw actions', () => {
  describe('addDraw', () => {
    it('returns a proper action', () => {
      const testDraws = [23, 67]
      expect(addDraws(testDraws)).to.be.deep.equal({type: 'ADD_DRAWS', draws: testDraws})
    })
  })
})
