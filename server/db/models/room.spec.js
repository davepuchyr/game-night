/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Room = db.model('room')

describe('Room model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('return the correct fields', () => {
    let newRoom; 

    beforeEach(() => {
      return Room.create({
        name: 'Play game with Tim!',
        game: 'DND'
      })
        .then(room => {
          newRoom = room;
        });
    });

    it('returns the correct name of the room', () => {
      expect(typeof newRoom.name).to.be.equal('string');
      expect(newRoom.name).to.be.equal('Play game with Tim!');
    });

    it('returns the correct game type of the room', () => {
      expect(typeof newRoom.game).to.be.equal('string');
      expect(newRoom.game).to.be.equal('DND');
    });
  });
});