import React from 'react'

import chai, { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon';

import socket from '../../socket'
import { RoomMessages } from '../RoomMessages'

describe('Component: RoomMessages', () => {
    let roomMessagesWrapper
    sinon.spy(RoomMessages.prototype, 'componentDidMount')
    sinon.spy(RoomMessages.prototype, 'componentDidUpdate')
    sinon.spy(RoomMessages.prototype, 'toggleInvite')
    RoomMessages.prototype.scrollToBottom = sinon.stub()
    RoomMessages.prototype.handleSubmit = sinon.stub()
    RoomMessages.prototype.returnToLobby = sinon.stub()


    beforeEach('create RoomMessages component wrappers', () => {
      roomMessagesWrapper = shallow(<RoomMessages
        user={{id: 1}}
        roomMessages={[
        ]}
        />)
    })

    afterEach('clear spies', () => {
      RoomMessages.prototype.scrollToBottom.reset()
    })

    describe('lifecycle methods', () => {
      it('calls componentDidMount', () => {
        expect(RoomMessages.prototype.componentDidMount.calledOnce).to.equal(true)
      })
    })

    describe('state check', () => {
      it('should have correct initial state', () => {
        expect(roomMessagesWrapper.state()).to.deep.equal({
            isOpen: false,
            searchNickName: '',
            invited: []
        })
      })
    })

    describe('view check', () => {
      it('should render InviteForm component', () => {
        expect(roomMessagesWrapper.find('InviteForm')).to.have.length(1)
      })

      it('should render an option div', () => {
        expect(roomMessagesWrapper.find('#room-message-component-option')).to.have.length(1)
      })

      it('should render three buttons', () => {
        expect(roomMessagesWrapper.find('button')).to.have.length(3)
      })

      it('should render message view div', () => {
        expect(roomMessagesWrapper.find('#message-view')).to.have.length(1)
      })

      it('should render a form', () => {
        expect(roomMessagesWrapper.find('form')).to.have.length(1)
      })

      it('form should have a text input', () => {
        expect(roomMessagesWrapper.find('input').props().type).to.equal('text')
      })
    })

    describe('actions and functions', () => {
      it('calls scrollToBottom when component mounts', () => {
        expect(RoomMessages.prototype.scrollToBottom.calledOnce).to.equal(true)
      })

      it('calls handleSubmit on form submission', () =>{
        roomMessagesWrapper.find('form').simulate('submit')
        expect(RoomMessages.prototype.handleSubmit.calledOnce).to.equal(true)
      })

      it('clicking toggle invite button calls toggleInvite', () => {
        roomMessagesWrapper.find('button').first().simulate('click')
        expect(RoomMessages.prototype.toggleInvite.calledOnce).to.equal(true)
      })

      it('toggleInvite properly sets state.isOpen', () => {
        expect(roomMessagesWrapper.state().isOpen).to.equal(false)
        roomMessagesWrapper.find('button').first().simulate('click')
        expect(roomMessagesWrapper.state().isOpen).to.equal(true)
      })

      it('clicking lobby button calls returnToLobby', () => {
        roomMessagesWrapper.find('.return-lobby-button').simulate('click')
        expect(RoomMessages.prototype.returnToLobby.calledOnce).to.equal(true)
      })

      describe('receiving messages', () => {
        beforeEach('add new message and clear spies/stubs', () => {
          RoomMessages.prototype.scrollToBottom.reset()
          roomMessagesWrapper.setProps({
            roomMessages: [
              {
                nickname: 'Josh',
                content: 'sup bro?'
              }
            ]
          })
        })

        it('should call componentDidUpdate', () => {
          expect(RoomMessages.prototype.componentDidUpdate.calledOnce).to.equal(true)
        })

        it('should call scrollToBottom', () => {
          expect(RoomMessages.prototype.scrollToBottom.calledOnce).to.equal(true)
        })

        it('should display message sender and message content', () => {
          expect(roomMessagesWrapper.find('#message-view').text()).to.equal('Josh:sup bro?')
        })
      })
    })
})
