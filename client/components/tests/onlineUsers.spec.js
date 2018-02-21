import React from 'react';
import chai, { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import { OnlineUsers } from '../onlineUsers';

describe('Component: OnlineUsers', () => {
  let onlineUsersWrapper;
  const users = [
    {nickname: 'Josh'},
    {nickname: 'Matt'}
  ];

  beforeEach('create OnlineUsers component wrapper', () => {
    onlineUsersWrapper = shallow(<OnlineUsers
      users={users}/>);
  });

  describe('view check', () => {
    it('renders a list of online Users', () => {
      expect(onlineUsersWrapper.find('.container-main-lobby-bottom-comps-players-onlineUsers-users')).to.have.length(2);
    });
  });

  it('displays nicknames of users', () => {
    expect(onlineUsersWrapper.find('.container-main-lobby-bottom-comps-players-onlineUsers-users').first().text()).to.equal('Josh');
  });
});