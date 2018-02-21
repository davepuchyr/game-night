import { expect } from 'chai';
import { createStore } from 'redux';
import { addImage, updateImage, deleteImage } from '../images.js';
import { default as imagesReducer } from '../images.js';



const testImage = {
  height: 900,
  width: 600,
  personal: true,
  url: 'http://cloundinarystuff.com',
  x: 300,
  y: 400
};

const testImageUpdated = {
  height: 500,
  width: 600,
  personal: true,
  url: 'http://cloundinarystuff.com',
  x: 300,
  y: 400
};

describe('Store: Images', () => {
  
  describe('Actions', () => {

    it('addImage returns a proper action', () => {
      expect(addImage(testImage)).to.be.deep.equal({type: 'ADD_IMAGE', image: testImage});
    });

    it('updateImage returns a proper action', () => {
      expect(updateImage(testImageUpdated)).to.be.deep.equal({type: 'UPDATE_IMAGE', updatedImage: testImageUpdated});
    });

    it('deleteImage returns a proper action', () => {
      expect(deleteImage(testImageUpdated.url)).to.be.deep.equal({type: 'DELETE_IMAGE', imageUrl: testImageUpdated.url});
    });
  });

  describe('Reducer', () => {
    let testStore;

    beforeEach('make mock store', () => {
      testStore = createStore(imagesReducer);
    });

    it('has proper initial state', () => {
      expect(testStore.getState()).to.be.deep.equal([]);
    });

    it('ADD_IMAGE properly adds action.images to the state array', () => {
      testStore.dispatch({type: 'ADD_IMAGE', image: testImage});
      expect(testStore.getState()).to.be.deep.equal([testImage]);
    });

    it('UPDATE_IMAGE properly updates action.image', () => {
      testStore.dispatch({type: 'ADD_IMAGE', image: testImage});
      testStore.dispatch({type: 'UPDATE_IMAGE', updatedImage: testImageUpdated});
      expect(testStore.getState()[0].height).to.be.deep.equal(500);
    });

    it ('DELETE_IMAGE properly deletes action.image from the state array', () => {
      testStore.dispatch({type: 'ADD_IMAGE', image: testImage});
      testStore.dispatch({type: 'DELETE_IMAGE', imageUrl: testImage.url});
      expect(testStore.getState()).to.be.deep.equal([]);
    });

  });
});