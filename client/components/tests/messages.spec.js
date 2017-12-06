import React from 'react'
import { createStore } from 'redux'
import { range, last } from 'lodash'

import chai, { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import faker from 'faker'

import { Messages } from '../Messages'


const createRandomMessages = amount => {
return range(0, amount).map(index => {
    return {
      id: index + 1,
      content: faker.lorem.sentence()
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
      
      messageData = [
        {
          id: 1,
          content: 'Hello Tim!',
          user: {
            nickname: 'Timo'
          }
        },
        {
          id: 2,
          content: 'Hello Jimmy',
          user: {
            nickname: 'Jonny'
          }
        }
      ]

      messageWrapper = shallow(<Messages messages={messageData} getMessages={() => {}}/>)
    })

    describe('view check', () => {
      
      it('messages', () => {
        expect(messageWrapper)
          .find('.container-main-lobby-bottom-comps-chat-messages-items').to.have
          .html("<div className='container-main-lobby-bottom-comps-chat-messages-items' ref='message'><div key=1 className='container-main-lobby-bottom-comps-chat-messages-items-list-line'><strong>Timo</strong> : Hello Tim!</div><div key=2 className='container-main-lobby-bottom-comps-chat-messages-items-list-line'><strong>Jonny</strong> : Hello Jimmy</div></div>")
      })
    })
})
