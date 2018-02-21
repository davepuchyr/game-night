import React from 'react';

import chai, { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import socket from '../../socket';
import { RoomList } from '../RoomList';

describe('Component: RoomList', () => {
  let roomListWrapper;
  const rooms = [{
    name: 'Party Room',
    game: 'Chutes and Ladders'
  }];
  const props = {
    getRooms: sinon.stub(),
    allRooms: rooms
  };
  const handleSubmitStub = sinon.stub();
  RoomList.prototype.handleSubmit = handleSubmitStub;
  sinon.spy(RoomList.prototype, 'componentDidMount');

  beforeEach('create RoomList component wrapper', () => {
    roomListWrapper = shallow(<RoomList
      getRooms={props.getRooms}
      allRooms={props.allRooms}/>);
  });

  describe('lifecycle methods', () => {
    it('calls componentDidMount', () => {
      expect(RoomList.prototype.componentDidMount.calledOnce).to.equal(true);
    });
  });

  describe('view check', () => {
    it('renders links for every created room', () => {
      expect(roomListWrapper.find('Link')).to.have.length(1);
    });

    it('has a form for creating a new room', () => {
      expect(roomListWrapper.find('form')).to.have.length(1);
    });

    it('has an input field for name', () => {
      expect(roomListWrapper.find('[name="name"]')).to.have.length(1);
    });

    it('has an input field for game', () => {
      expect(roomListWrapper.find('[name="game"]')).to.have.length(1);
    });
  });

  describe('actions and functions', () => {
    it('calls getRoom when component mounts', () => {
      expect(props.getRooms.called).to.equal(true);
    });

    it('calls handleSubmit when form is entered', () => {
      roomListWrapper.find('form').first().simulate('submit');
      expect(handleSubmitStub.calledOnce).to.equal(true);
    });
  });
});