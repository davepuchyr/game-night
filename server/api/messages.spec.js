/* global describe beforeEach it */
const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Message = db.model('message');

describe('Message routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/messages/', () => {
    const newContent = 'Tim is the best!';

    beforeEach(() => {
      return Message.create({
        content: newContent
      });
    });

    it('GET /api/messages', () => {
      return request(app)
        .get('/api/messages/')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].content).to.be.equal(newContent);
        });
    });

    it('GET /api/messages eager loaded', () => {
      return request(app)
        .get('/api/messages/')
        .expect(200)
        .then(res => {
          expect(typeof res.body[0].userId).to.be.equal('object');
          expect(typeof res.body[0].user).to.be.equal('object');
        });
    });

    it('POST /api/rooms', () => {
      return request(app)
        .post('/api/rooms/')
        .send({
            content: newContent
        })
        .expect(201)
        .then(res => {
          const createdMessage = res.body;
          return Message.findById(createdMessage.id);
        })
        .then(newMessage => {
          expect(newMessage.content).to.be.equal('Tim is the best!');
        });
    });

    it('POST /api/rooms eager loaded', () => {
      return request(app)
        .post('/api/rooms/')
        .send({
            content: newContent
        })
        .expect(201)
        .then(res => {
          const createdMessage = res.body;
          return Message.findById(createdMessage.id);
        })
        .then(newMessage => {
          expect(typeof newMessage.userId).to.be.equal('object');
        });
    });
  }); // end describe('/api/messages')
}); // end describe('Message routes')
