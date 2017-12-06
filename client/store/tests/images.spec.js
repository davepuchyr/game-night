import { expect } from 'chai'
import { createStore } from 'redux'
import { addImage, updateImage, deleteImage } from '../images.js'
import { default as imagesReducer } from '../images.js'



const testImage = {
  height: 900,
  width: 600,
  personal: true,
  url: 'http://cloundinarystuff.com',
  x: 300,
  y: 400
}

describe('Store: Images', () => {
  
  describe('Actions', () => {

    it('addImage returns a proper action', () => {
      expect(addImage(testImage)).to.be.deep.equal({type: 'ADD_IMAGE', image: testImage})
    })
  })

  describe('Reducer', () => {
    let testStore
    beforeEach('make mock store', () => {
      testStore = createStore(imagesReducer)
    })

    it('has proper initial state', () => {
      expect(testStore.getState()).to.be.deep.equal([])
    })

    it('ADD_IMAGE properly adds action.images to the state array', () => {
      testStore.dispatch({type: 'ADD_IMAGE', image: testImage})
      expect(testStore.getState()).to.be.deep.equal([testImage])
    })

  })
})
