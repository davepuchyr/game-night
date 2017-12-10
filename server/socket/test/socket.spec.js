import io from 'socket.io-client'
const {expect} = require('chai')
let should = require('should')

let socketURL = 'http://0.0.0.0:3000' // virtual url
let options = {
	transports: ['websocket'],
	'force new connection': true
}
// virtual users
let user1 = {'1':1, 'nickname':'MattyAmazing'}
let user2 = {'2':2, 'nickname':'KingJoshua'}
let user3 = {'3':3, 'nickname':'JSMasterTim'}
let user4 = {'3':4, 'nickname':'PrincessHyunjoo'}

/*
* For more information :
* 1) http://liamkaufman.com/blog/2012/01/28/testing-socketio-with-mocha-should-and-socketio-client/
* 2) https://github.com/socketio/socket.io-client/blob/master/test/connection.js
*/

describe("Sockets",() => {
	let client1 = ''
	beforeEach(()=>{
		client1 = io.connect(socketURL, options)
		return client1
	})

	it('Users connect & disconnect', done => {
		let client2, onlineUsers = 0;

		client1.on('connection', socket => {
		  /*
	    * NEW USERS
	    */
			client1.emit('userConnect', user1)

			/*
			* Since first client is connected,
			* we connect the second client.
			*/
	    /*
	    * user2 connects
	    */
	    client2 = io.connect(socketURL, options)
			client2.on('connection', socket => {
				client2.emit('userConnect', user2)
			})
	    /*
	    * user2 is added to online list
	    */
			client2.on('countUser', nickname => {
				nickname.should.equal(user2.nickname + 'is online')
				client2.disconnect()
			})
	    /*
	    * user2 LOGOUT
	    */
			client2.on('disconnect', () => {
				onlineUsers.should.equal(1)
			})

		})
    /*
    * count all new users
    */
		client1.on('countUser', () => {
			onlineUsers += 1
			onlineUsers.should.equal(2)
			client1.disconnect()
			done()
		})

		done()
	})

	describe("New Messages",() => {

		it('Users should post messages', done => {

			client1.on('connection', () => {
				client1.emit('new_message', "hello")
			})
			client1.on('received_new_message', message => {
				message.should.equal("hello")
			})

			done()
		})
	})


	describe("New Room",() => {

		it('User should create a room', done => {

			client1.on('connection', () => {
				client1.emit('created_room', '/room/1')
			})
			client1.on('add_new_room', room => {
				room.should.equal('/room/1')
			})

			done()
		})
	})

	describe("Join Room",() => {

		it('When users join a room', done => {
			client1.on('connection', () => {
				client1.emit('joinroom', ('/room/1', user1.nickname))
				client1.join('/room/1')
			})
			client1.on('addMessage', message => {
				message.should.equal(`GM ${user1.nickname} joined the room`)
			})

			done()
		})
	})

	describe("Moving Tokens",() => {

		it('When tokens move', done => {

			client1.on('connection', () => {
				client1.emit('move_token', ([500,500],'blue','/room/1'))
				client1.join('/room/1')
			})
			client1.on('moved', (newCoords,color) => {
				newCoords.should.equal([500,500])
				color.should.equal('blue')
			})

			done()
		})
	})

})
