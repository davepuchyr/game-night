import React from 'react'

import chai, { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import Invitations from '../Invitations'


describe('Invitations Component Testing', () => {
    let invites, invitationWrapper
    beforeEach('Create Invitations component wrapper', () => {

      invites = ['/room/1', '/room/2']
      invitationWrapper = shallow(<Invitations roomInvites={invites}/>)
    })

    describe('view check', () => {

      it('invitations', () => {
        expect(invitationWrapper.find('div')).to.have.length(1)
      })

      it('list of people', () => {
        expect(invitationWrapper.find('a')).to.have.length(2)
      })
    })
})