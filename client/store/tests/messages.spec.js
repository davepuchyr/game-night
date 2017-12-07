import { expect } from 'chai'
import { fetchMessages, postMessage, getMessages, newMessage } from '../messages'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Store: Messages', () => {
  let store
  let mockAxios

  const initialState = {allMessages: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('FETCH MESSAGES', () => {

    const fakeMessages = [{nickname: 'mattyamazin', content: 'yooooo'}, {nickname: 'retrofuturejosh', content: 'hiiiiii'}]
    it('thunk creator eventually correctly dispatches the GET_MESSAGES action', () => {
      mockAxios.onGet('/api/messages').replyOnce(200, fakeMessages)
      return store.dispatch(fetchMessages())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_MESSAGES')
          expect(actions[0].messages).to.be.deep.equal(fakeMessages)
        })
    })
  })
})