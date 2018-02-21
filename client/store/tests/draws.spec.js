import { expect } from 'chai';
import { createStore } from 'redux';
import { addDraws } from '../draws.js';
import { default as drawsReducer } from '../draws.js';

const testDraw = {
  erase: false,
  firstPos: {
    x: 300,
    y: 400
  },
  paintColor: 'black',
  room: '1',
  secondPos: {
    x: 356,
    y: 102
  }
};

describe('Store: Draws', () => {
  
  describe('Actions', () => {

    it('addDraws returns a proper action', () => {
      expect(addDraws(testDraw)).to.be.deep.equal({type: 'ADD_DRAWS', draws: testDraw});
    });
  });

  describe('Reducer', () => {
    let testStore;

    beforeEach('make mock store', () => {
      testStore = createStore(drawsReducer);
    });

    it('has proper initial state', () => {
      expect(testStore.getState()).to.be.deep.equal([]);
    });

    it('properly adds action.draws to the state array', () => {
      testStore.dispatch({type: 'ADD_DRAWS', draws: testDraw});
      expect(testStore.getState()).to.be.deep.equal([testDraw]);
    });

  });
});