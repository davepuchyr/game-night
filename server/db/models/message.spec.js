/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Message = db.model('message')

describe('Message model', () => {
    beforeEach(() => {
      return db.sync({force: true})
    });
  
    describe('return the correct fields', () => {
      let newMessage; 
  
      beforeEach(() => {
        return Message.create({
          content: 'Tim is the best!'
        })
          .then(message => {
            newMessage = message;
          });
      });
  
      it('returns the correct content of the message', () => {
        expect(typeof newMessage.content).to.be.equal('string');
        expect(newMessage.content).to.be.equal('Tim is the best!');
      });
    });
  });