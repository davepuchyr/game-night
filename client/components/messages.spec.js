import React from 'react'
import {createStore} from 'redux'
import {range, last} from 'lodash'

import chai, {expect} from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai);
import faker from 'faker'

import { Messages } from './Messages'
// import rootReducer from '../../front_end/redux/reducer';
import store from '../store'
// import {USERS_RECEIVED, USERS_LOADING, NEW_USER} from '../../front_end/redux/action_types';
// import {createLoadingAction, createUsersReceivedAction, createNewUserAction} from '../../front_end/redux/actions';

const createRandomMessages = amount => {
return range(0, amount).map(index => {
    return {
      id: index + 1,
      name: faker.lorem.sentence()
    }
  })
}

const testUtilities = {
    createRandomMessages,
    createOneRandomMessage: () => createRandomMessages(1)[0]
};

describe('Messages Component Testing', () => {

  let messageData, messageWrapper

  beforeEach('Create Messages component wrapper', () => {
    messageData = {
        id: 5,
        content: 'Tim is cool'
    }
    // creates the testable React component
    messageWrapper = shallow(<Messages />)
  })
})