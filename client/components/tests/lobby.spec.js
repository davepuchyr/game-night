import React from 'react';

import chai, { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import socket from '../../socket';
import { Lobby } from '../Lobby';

describe('Component: Lobby', () => {
  let lobbyShallowWrapper;
  const props = {
    isLoggedIn: true,
    user: { id: 3, email: 'josh@josh.com'},
    invitations: {},
    handleClick: sinon.stub()
  };
  sinon.spy(Lobby.prototype, 'componentDidMount');

  beforeEach('create Lobby component wrappers and spies', () => {
    lobbyShallowWrapper = shallow(<Lobby
    invitations={props.invitations} 
    isLoggedIn={props.isLoggedIn}
    handleClick={props.handleClick}/>);
  });

  describe('lifecycle methods', () => {
    it('calls componentDidMount', () => {
    expect(Lobby.prototype.componentDidMount.calledOnce).to.equal(true);
    });
  });

  describe('view check', () => {
    it('should render Messages component', () => {
      expect(lobbyShallowWrapper.find('Connect(Messages)')).to.have.length(1);
    });

    it('should render RoomList component', () => {
      expect(lobbyShallowWrapper.find('Connect(RoomList)')).to.have.length(1);
    });

    it('should render OnlineUsers component', () => {
      expect(lobbyShallowWrapper.find('Connect(OnlineUsers)')).to.have.length(1);
    });
  });

  describe('functions', () => {
    it('has a logout button', () => {
      const logOutButton = lobbyShallowWrapper.find('a');
      expect(logOutButton).to.have.length(1);
      expect(logOutButton.text()).to.equal('Logout');
    });

    it('handleClick is called when log out button is clicked', () => {
      lobbyShallowWrapper.find('a').simulate('click');
      expect(props.handleClick.calledOnce).to.equal(true);
    });
  });
});