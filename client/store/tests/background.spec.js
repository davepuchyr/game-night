import { expect } from 'chai'
import { updateBackground } from '../background'


describe('Store: background image actions', () => {
  describe('updateBackground', () => {
    it('returns a proper action', () => {

      const testImg = {url: 'http://correctimg.jpg'}

      expect(updateBackground(testImg)).to.be.deep.equal({ type: 'UPDATE_BACKGROUND', img: testImg})
    })
  })
})
