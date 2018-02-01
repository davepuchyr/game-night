import React from 'react'

import chai, { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon';

import socket from '../../socket'
import { DropGroup } from '../DropGroup'

describe('Component: DropGroup', () => {
    let dropWrapper

    beforeEach('create DropGroup component wrapper', () => {
      dropWrapper = shallow(<DropGroup/>)
    })

    describe('state check', () => {
      it('has proper initial state', () => {
        expect(dropWrapper.state()).to.deep.equal({
          hover: false
        })
      })
    })

    describe('view check', () => {
      it('should render Dropzone component', () => {
        expect(dropWrapper.find('Dropzone')).to.have.length(1)
      })

      it('should render trash icon', () => {
        expect(dropWrapper.find('img')).to.have.length(1)
      })
    })

    describe('actions and functions', () => {
      it('handleMouseOver should correctly set state.hover', () => {
        DropGroup.prototype.handleMouseOver.call(dropWrapper)
        expect(dropWrapper.state().hover).to.equal(true)
      })

      it('handleMouseOver should change drop icon src', () => {
        expect(dropWrapper.find('img').props().src).to.equal('/assets/broadcast_image_icon.png')
        DropGroup.prototype.handleMouseOver.call(dropWrapper)
        expect(dropWrapper.find('img').props().src).to.equal('/assets/broadcast_image_icon_mix2.png')
      })
      
      it('handleMouseLeave should correctly set state.hover', () => {
        DropGroup.prototype.handleMouseOver.call(dropWrapper)
        expect(dropWrapper.state().hover).to.equal(true)
        DropGroup.prototype.handleMouseLeave.call(dropWrapper)
        expect(dropWrapper.state().hover).to.equal(false)
      })
    })
})
