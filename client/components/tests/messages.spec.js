import React from 'react'

import chai, { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon';

import { Messages } from '../Messages'


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

      messageWrapper = shallow(<Messages messages={messageData} getMessages={()=>{}}/>)
    })

    describe('lifecycle methods', () => {

      it('calls componentDidMount', () => {
        sinon.spy(Messages.prototype, 'componentDidMount')
        const wrapper = mount(<Messages messages={messageData} getMessages={()=>{}}/>)
        expect(Messages.prototype.componentDidMount.calledOnce).to.equal(true)
      })

      it('should not call componentDidUpdate yet', () => {
        sinon.spy(Messages.prototype, 'componentDidUpdate')
        const wrapper = mount(<Messages messages={messageData} getMessages={()=>{}}/>)
        expect(Messages.prototype.componentDidUpdate.calledOnce).to.equal(false)
      })
    })

    describe('view check', () => {

      it('messages', () => {
        expect(messageWrapper.find('div')).to.have.length(4)
      })

      it('strong text', () => {
        expect(messageWrapper.find('strong')).to.have.length(2)
      })

      it('form', () => {
        expect(messageWrapper.find('form')).to.have.length(1)
      })

      it('input field', () => {
        expect(messageWrapper.find('input')).to.have.length(1)
      })

      it('submit button', () => {
        expect(messageWrapper.find('button')).to.have.length(1)
      })
    })

    describe('form testing', () => {

      it('input field', () => {
        const wrapper = mount((
          <Messages messages={messageData} getMessages={()=>{}}/>
        ))
        wrapper.find('input').simulate('change', {target: { value : 'Timmy'}})
        expect(wrapper.state('messageInput')).to.equal('Timmy')
      })

      it('submit button', () => {
        const wrapper = mount((
          <Messages messages={messageData} getMessages={()=>{}}/>
        ))
        wrapper.setState({ messageInput: 'Hi' })
        wrapper.find('button').simulate('submit')
        expect(wrapper.state('messageInput')).to.equal('')
      })
    })
})
