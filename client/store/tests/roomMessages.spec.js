import { expect } from 'chai'
import { createStore } from 'redux'
import { addMessage } from '../roomMessages'
import { default as roomMessagesReducer } from '../roomMessages'

const mockMessage = {nickname: 'guyorgirl', content: 'hi'} 
const initialState = []

describe('Store: Room Messages', () => {

  describe('Actions:', () => {

    it('addMessage returns a proper action', () => {
      expect(addMessage(mockMessage)).to.be.deep.equal({type: 'ADD_MESSAGE', message: mockMessage})
    })
  })

  describe('Reducer:', () => {
    let testStore
    
    beforeEach('make mock store', () => {
      testStore = createStore(roomMessagesReducer)
    })

    it('has proper initial state', () => {
      expect(testStore.getState()).to.be.deep.equal(initialState)
    })

    it ('ADD_MESSAGE properly adds a message to state array', () => {
      testStore.dispatch({type: 'ADD_MESSAGE', message: mockMessage})
      expect(testStore.getState()).to.be.deep.equal([mockMessage])
    })

  })
})
