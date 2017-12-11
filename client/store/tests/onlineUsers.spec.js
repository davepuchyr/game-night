import { expect } from 'chai'
import { createStore } from 'redux'
import { getOnlineUsers } from '../onlineUsers'
import { default as onlineUsersReducer } from '../onlineUsers'

const mockUsersOnline = [{id: 4, nickname: 'MattyAmazing'},
{id: 3, nickname: 'retrofuturejosh'}]
const initialState = []

describe('Store: Online Users', () => {
  describe('Actions:', () => {

    it('getOnline users returns a correct action', () => {
      expect(getOnlineUsers(mockUsersOnline)).to.be.deep.equal({type: 'GET_ONLINE_USERS', onlineUsers: mockUsersOnline})
    })

  })

  describe('Reducer:', () => {
      let testStore
  
      beforeEach('make mock store', () => {
        testStore = createStore(onlineUsersReducer)
      })
  
      it('has proper initial state', () => {
        expect(testStore.getState()).to.be.deep.equal(initialState)
      })
  
      it('GET_ONLINE_USERS properly updates the list of users on state', () => {
        testStore.dispatch({type: 'GET_ONLINE_USERS', onlineUsers: mockUsersOnline})
        expect(testStore.getState()).to.be.deep.equal(mockUsersOnline)
      })
    })
})