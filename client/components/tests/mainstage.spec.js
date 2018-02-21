import React from 'react';

import chai, { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import socket from '../../socket';
import { MainStage } from '../canvaselements/MainStage';

describe('Component: MainStage', () => {
  let mainStageWrapper;
  const props = {
    tokens: {
      'black': [500, 500],
      'red': [550, 550],
      'green': [600, 600],
      'blue': [650, 650]
    }
  };
  sinon.spy(MainStage.prototype, 'componentDidMount');
  sinon.spy(MainStage.prototype, 'componentDidUpdate');
  sinon.spy(MainStage.prototype, 'aspectRatio');
  MainStage.prototype.moveStageOnHover = sinon.stub();

  beforeEach('create MainStage component wrapper', () => {
    mainStageWrapper = shallow(<MainStage
      tokens={props.tokens}
      rId={1}
      background={{url: 'http://i.imgur.com/uhhfaMZ.png'}}/>)
  });

  describe('lifecycle methods', () => {
    it('calls componentDidMount', () => {
      expect(MainStage.prototype.componentDidMount.calledOnce).to.equal(true);
    });
  });

  describe('state check', () => {
    it('has correct initial state', () => {
      expect(mainStageWrapper.state()).to.deep.equal({
        imageUrl: 'http://i.imgur.com/uhhfaMZ.png',
        backgroundImage: null,
        shift: false,
        alt: false,
        dragStart: [],
        dragOffSet: [0, 0],
        canvas: null,
        context: null,
        isDrawing: false,
        mode: 'brush',
        backgroundHeight: 1911,
        backgroundWidth: 2196
      });
    });
  });

  describe('view check', () => {
    it('should render Stage component', () => {
      expect(mainStageWrapper.find('Stage')).to.have.length(1);
    });

    it('should render Layer component', () => {
      expect(mainStageWrapper.find('Layer')).to.have.length(1);
    });

    it('should render Image component', () => {
      expect(mainStageWrapper.find('Image')).to.have.length(1);
    });

    it('should render Drawing component', () => {
      expect(mainStageWrapper.find('Connect(Drawing)')).to.have.length(1);
    });

    it('should render 4 HexPiece components', () => {
      expect(mainStageWrapper.find('Connect(HexPiece)')).to.have.length(4);
    });

    it('should not render MyImage Component', () => {
      expect(mainStageWrapper.find('Connect(MyImage)')).to.have.length(0);
    });

    it('should not render GroupImage Component', () => {
      expect(mainStageWrapper.find('Connect(GroupImage)')).to.have.length(0);
    });
  });

  describe('actions and functions', () => {
    it('should call moveStageOnHover on mouseOver Stage', () => {
      mainStageWrapper.find('Image').simulate('mouseOver');
      expect(MainStage.prototype.moveStageOnHover.calledOnce).to.equal(true);
    });

    it('calling handleKeyDown with Shift should properly set state.shift', () => {
      MainStage.prototype.handleKeyDown.call(mainStageWrapper, {key: 'Shift'});
      expect(mainStageWrapper.state().shift).to.equal(true);
    });

    it('calling handleKeyUp with Shift should properly set state.shift', () => {
      MainStage.prototype.handleKeyDown.call(mainStageWrapper, {key: 'Shift'});
      expect(mainStageWrapper.state().shift).to.equal(true);
      MainStage.prototype.handleKeyUp.call(mainStageWrapper, {key: 'Shift'});
      expect(mainStageWrapper.state().shift).to.equal(false);
    });

    it('calling handleKeyDown with Alt should properly set state.alt', () => {
      MainStage.prototype.handleKeyDown.call(mainStageWrapper, {key: 'Alt'});
      expect(mainStageWrapper.state().alt).to.equal(true);
    });

    it('calling handleKeyUp with Alt should properly set state.alt', () => {
      MainStage.prototype.handleKeyDown.call(mainStageWrapper, {key: 'Alt'});
      expect(mainStageWrapper.state().alt).to.equal(true);
      MainStage.prototype.handleKeyUp.call(mainStageWrapper, {key: 'Alt'});
      expect(mainStageWrapper.state().alt).to.equal(false);
    });

    describe('setting a new background', () => {
      beforeEach('reset spies and set new props', () => {
        MainStage.prototype.componentDidUpdate.reset();
        MainStage.prototype.aspectRatio.reset();
        mainStageWrapper.setProps({background: {
          url: '/fakeUrl',
          originalHeight: 100,
          originalWidth: 100,
        }});
      });

      it('should call componentDidUpdate', () => {
        expect(MainStage.prototype.componentDidUpdate.calledOnce).to.equal(true);
      });

      it('should call Aspect Ratio function', () => {
        expect(MainStage.prototype.componentDidUpdate.calledOnce).to.equal(true);
      });

      it('should be properly resized', () => {
        let result = MainStage.prototype.aspectRatio.call(mainStageWrapper, 100, 100);
        expect(result).to.deep.equal([1680, 1680]);
      });
    });

    describe('adding images', () => {
      it('personal images should render MyImage component', () => {
        mainStageWrapper.setProps({
          images: [{
            x: 10,
            y: 10,
            width: 10,
            height: 10,
            url: '/fakeUrl',
            personal: true
          }]
        });
        expect(mainStageWrapper.find('Connect(MyImage)')).to.have.length(1);
      });

      it('group images should render GroupImage component', () => {
        mainStageWrapper.setProps({
          images: [{
            x: 5,
            y: 5,
            width: 5,
            height: 5,
            url: '/anotherFakeUrl',
            personal: false
          }]
        });
        expect(mainStageWrapper.find('Connect(GroupImage)')).to.have.length(1);
      });
    });
  });
});