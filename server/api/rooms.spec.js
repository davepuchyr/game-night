/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Room = db.model('room')

describe('Room routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/rooms/', () => {
    const timsRoomName = 'Tim is the best!';
    const timsRoomGame = 'DnD';

    beforeEach(() => {
      return Room.create({
        name: timsRoomName,
        game: timsRoomGame
      });
    });

    it('GET /api/rooms', () => {
      return request(app)
        .get('/api/rooms/')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(timsRoomName);
          expect(res.body[0].game).to.be.equal(timsRoomGame);
        });
    });

    it('POST /api/rooms', () => {
      return request(app)
        .post('/api/rooms/')
        .send({
            name: timsRoomName,
            game: timsRoomGame
        })
        .expect(201)
        .then(res => {
          const createdRoom = res.body;
          return Room.findById(createdRoom.id);
        })
        .then(newRoom => {
          expect(newRoom.name).to.be.equal('Tim is the best!');
          expect(newRoom.game).to.be.equal('DnD');
        });
    });

    it('POST /api/rooms eager loaded', () => {
      return request(app)
        .post('/api/rooms/')
        .send({
            name: timsRoomName,
            game: timsRoomGame
        })
        .expect(201)
        .then(res => {
          const createdRoom = res.body;
          return Room.findById(createdRoom.id);
        })
        .then(newRoom => {
          expect(typeof newRoom.adminId).to.be.equal('object');
        });
    });
  }); // end describe('/api/rooms')
}); // end describe('Room routes')
