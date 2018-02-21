import React from 'react';

import chai, { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import socket from '../../socket';
import { Drop } from '../drop';

describe('Component: Drop', () => {
  let dropWrapper;

  beforeEach('create Drop component wrapper', () => {
    dropWrapper = shallow(<Drop/>);
  });

  describe('state check', () => {
    it('has proper initial state', () => {
      expect(dropWrapper.state()).to.deep.equal({
        hover: false
      });
    });
  });

  describe('view check', () => {
    it('should render Dropzone component', () => {
      expect(dropWrapper.find('Dropzone')).to.have.length(1);
    });

    it('should render trash icon', () => {
      expect(dropWrapper.find('img')).to.have.length(1);
    });
  });

  describe('actions and functions', () => {
    it('handleMouseOver should correctly set state.hover', () => {
      Drop.prototype.handleMouseOver.call(dropWrapper);
      expect(dropWrapper.state().hover).to.equal(true);
    });

    it('handleMouseOver should change drop icon src', () => {
      expect(dropWrapper.find('img').props().src).to.equal('/assets/image_icon.png');
      Drop.prototype.handleMouseOver.call(dropWrapper);
      expect(dropWrapper.find('img').props().src).to.equal('/assets/image_icon_mix2.png');
    })
    
    it('handleMouseLeave should correctly set state.hover', () => {
      Drop.prototype.handleMouseOver.call(dropWrapper);
      expect(dropWrapper.state().hover).to.equal(true);
      Drop.prototype.handleMouseLeave.call(dropWrapper);
      expect(dropWrapper.state().hover).to.equal(false);
    });
  });
});