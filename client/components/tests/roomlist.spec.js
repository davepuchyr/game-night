import React from 'react'

import chai, { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon';

import socket from '../../socket'
import { RoomList } from '../RoomList'

describe('Component: RoomList', () => {
    let roomListWrapper
    const rooms = [{
        name: 'Party Room',
        game: 'Chutes and Ladders'
    }]
    const props = {
        getRooms: sinon.stub(),
        allRooms: rooms}
    
    sinon.spy(RoomList.prototype, 'componentDidMount')

    beforeEach('create RoomList component wrapper', () => {
      roomListWrapper = shallow(<RoomList
        getRooms={props.getRooms}
        allRooms={props.allRooms}/>)
    })

    describe('lifecycle methods', () => {
      it('calls componentDidMount', () => {
        expect(RoomList.prototype.componentDidMount.calledOnce).to.equal(true)
      })
    })

    describe('view check', () => {
      it('renders links for every created room', () => {
        expect(roomListWrapper.find('Link')).to.have.length(1)
      })

      it('has a form for creating a new room', () => {
        expect(roomListWrapper.find('form')).to.have.length(1)
      })
    })

    describe('actions and functions', () => {
      it('calls getRoom when component mounts', () => {
        expect(props.getRooms.called).to.equal(true)
      })
    })

    // describe('view check', () => {
    //   it('should render Messages component', () => {
    //       expect(lobbyShallowWrapper.find('Connect(Messages)')).to.have.length(1)
    //   })
    // })

    // describe('functions', () => {
    //     it('has a logout button', () => {
    //         const logOutButton = lobbyShallowWrapper.find('a')
    //         expect(logOutButton).to.have.length(1)
    //         expect(logOutButton.text()).to.equal('Logout')
    //     })
  
    //     it('handleClick is called when log out button is clicked', () => {
    //         lobbyShallowWrapper.find('a').simulate('click')
    //         expect(props.handleClick.calledOnce).to.equal(true)
    //     })
    // })
})