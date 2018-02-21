import React from 'react';

import chai, { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import socket from '../../socket';
import { AddBackground } from '../AddBackground';

describe('Component: AddBackground', () => {
  let addBackgroundWrapper;

  beforeEach('create AddBackground component wrapper', () => {
    addBackgroundWrapper = shallow(<AddBackground/>);
  });

  describe('state check', () => {
    it('has proper initial state', () => {
      expect(addBackgroundWrapper.state()).to.deep.equal({
        hover: false
      });
    });
  });

  describe('view check', () => {
    it('should render Dropzone component', () => {
      expect(addBackgroundWrapper.find('Dropzone')).to.have.length(1);
    });

    it('should render trash icon', () => {
      expect(addBackgroundWrapper.find('img')).to.have.length(1);
    });
  });

  describe('actions and functions', () => {
    it('handleMouseOver should correctly set state.hover', () => {
      AddBackground.prototype.handleMouseOver.call(addBackgroundWrapper);
      expect(addBackgroundWrapper.state().hover).to.equal(true);
    });

    it('handleMouseOver should change trash icon src', () => {
      expect(addBackgroundWrapper.find('img').props().src).to.equal('/assets/background_icon.png');
      AddBackground.prototype.handleMouseOver.call(addBackgroundWrapper);
      expect(addBackgroundWrapper.find('img').props().src).to.equal('/assets/screen_icon_blue.png');
    });
    
    it('handleMouseLeave should correctly set state.hover', () => {
      AddBackground.prototype.handleMouseOver.call(addBackgroundWrapper);
      expect(addBackgroundWrapper.state().hover).to.equal(true);
      AddBackground.prototype.handleMouseLeave.call(addBackgroundWrapper);
      expect(addBackgroundWrapper.state().hover).to.equal(false);
    });
  });
});
