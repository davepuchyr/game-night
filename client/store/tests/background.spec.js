import { expect } from 'chai'
import { createStore } from 'redux'
import { updateBackground } from '../background'
import { default as backgroundReducer } from '../background'

const testImg = {url: 'http://correctimg.jpg'}
const initialState = {url: 'http://i.imgur.com/uhhfaMZ.png'}

describe('Store: Background', () => {

  describe('Actions', () => {

    it('updateBackground returns a proper action', () => {
      expect(updateBackground(testImg)).to.be.deep.equal({ type: 'UPDATE_BACKGROUND', img: testImg})
    })
  })

  describe('Reducer', () => {
    let testStore

    beforeEach('make mock store', () => {
      testStore = createStore(backgroundReducer)
    })

    it('has proper initial state', () => {
      expect(testStore.getState()).to.be.deep.equal(initialState)
    })

    it('properly adds an image to state', () => {
      testStore.dispatch({type: 'UPDATE_BACKGROUND', img: testImg})
      expect(testStore.getState()).to.be.deep.equal(testImg)
    })
  })
})
