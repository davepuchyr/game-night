import { expect } from 'chai';
import { fetchMessages, postMessage, getMessages, newMessage } from '../messages';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Store: Messages', () => {
  let store;
  let mockAxios;

  const initialState = {allMessages: []};

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('Thunks', () => {
    const fakeMessages = [{nickname: 'mattyamazin', content: 'yooooo'}, {nickname: 'retrofuturejosh', content: 'hiiiiii'}];
    const fakePostMessage = {nickname: 'hjkim', content: 'nyaaaa'};

    it('fetchMessages thunk eventually correctly dispatches the GET_MESSAGES action', () => {
      mockAxios.onGet('/api/messages').replyOnce(200, fakeMessages);
      return store.dispatch(fetchMessages())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_MESSAGES');
          expect(actions[0].messages).to.be.deep.equal(fakeMessages);
        });
    });

    it('postMessage thunk eventually correctly dispatches the POST_MESSAGE action', () => {
      mockAxios.onPost('/api/messages').replyOnce(204, fakePostMessage);
      return store.dispatch(postMessage(fakePostMessage))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('NEW_MESSAGE');
          expect(actions[0].message).to.be.deep.equal(fakePostMessage);
        });

    });
  });
});