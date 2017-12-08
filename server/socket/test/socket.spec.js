import io from 'socket.io-client'
import {expect} from 'chai'
let should = require('should')
let socketURL = 'http://localhost:1337'
let options = {
		forceNew: true,
		reconnection: false
}
// virtual users
let user1 = {id:1, nickname:'MattyAmazing'}
let user2 = {id:2, nickname:'KingJoshua'}
let user3 = {id:3, nickname:'JSMasterTim'}
let user4 = {id:4, nickname:'PrincessHyunjoo'}

/*
* For more information :
* 1) http://liamkaufman.com/blog/2012/01/28/testing-socketio-with-mocha-should-and-socketio-client/
* 2) https://github.com/socketio/socket.io-client/blob/master/test/connection.js
*/


describe("Sockets",() => {
	let client1

	beforeEach(done => {
		client1 = io(socketURL, options)
		done()
	})

	it('Users connect & disconnect', done => {
		let client2
		client1.on('connect', () => {
		  /*
	    * NEW USERS
	    */
			client1.emit('userConnect', user1.id)
			/*
			* Since first client is connected,
			* we connect the second client.
	    * user2 connects
	    */
	    client2 = io.connect(socketURL, options)
			client2.on('connect', socket => {
				client2.emit('userConnect', user2.id)
			})
	    /*
	    * user2 is added to online list
	    */
			client2.on('updateOnlineUsers', onlineUser => {
				expect(onlineUser).to.deep.equal([1,2])
				client2.disconnect()
			})
		})

		client1.on('updateOnlineUsers', onlineUser => {
			expect(onlineUser).to.deep.equal([1])
			client1.disconnect()
			done()
		})
	})

	describe("New Messages",() => {
		afterEach(done => {
			done()
		})

		it('Users should post messages', done => {
			let client2

			let clientPostMessage = (client,num) => {
				switch(num){
					case 1:
						console.log('HEYY')
						client.emit('new_message', "hello")
						break;
					default:
						client.emit('new_message', "Hi, I'm KingJoshua")
						break;
				}
			}

			client1.on('connect', () => {
				client1.emit('userConnect', user1.id)
				clientPostMessage(client1, 1)

				client2 = io.connect(socketURL, options)
				client2.on('connect', () => {
					client2.emit('userConnect', user2.id)
					clientPostMessage(client2)
				})
			})
			client1.on('received_new_message', message => {
				console.log('line 93', message)
				message.should.equal("Hi, I'm KingJoshua")
				client1.disconnect()
				done()
			})
		})
	})



	// describe("New Room",() => {

	// 	it('User should create a room', done => {

	// 		client1.on('connection', () => {
	// 			client1.emit('created_room', '/room/1')
	// 		})
	// 		client1.on('add_new_room', room => {
	// 			room.should.equal('/room/1')
	// 		})

	// 		done()
	// 	})
	// })

	// describe("Join Room",() => {

	// 	it('When users join a room', done => {
	// 		client1.on('connection', () => {
	// 			client1.join('/room/1')
	// 			client1.emit('joinroom', ('/room/1', {nickname:user1.nickname}))
	// 		})
	// 		client1.on('addMessage', message => {
	// 			message.should.equal(`GM ${message.nickname} joined the room`)
	// 		})

	// 		done()
	// 	})
	// })

	// describe("Moving Tokens",() => {
	// 	let client2 = ''

	// 	it('When tokens move', done => {

	// 		client1.on('connection', () => {
	// 			client1.join('/room/1')
	// 			client1.emit('move_token', ([500,500],'blue','/room/1'))
	// 		})
	// 		client1.on('moved', (newCoords,color) => {
	// 			newCoords.should.equal([500,500])
	// 			color.should.equal('blue')
	// 		})
	// 		done()
	// 	})
	// 	/*
	// 	* When a new user joins the room
	// 	*/
	// 	it('When second user join, can second user see new tokens', done => {

	// 		client2 = io.connect(socketURL, options)

	// 		client2.on('connection', () => {
	// 			client2.emit('joinroom',('/room/1',user2.nickname))
	// 		})
	// 		client2.on('addMessage', message => {
	// 			message.should.equal(`GM ${user1.nickname} joined the room`)
	// 		})
	// 		client2.on('moved',(newCoords,color) => {
	// 			newCoords.should.equal([500,500])
	// 			color.should.equal('blue')
	// 		})
	// 		done()
	// 	})
	// })

	// describe("Post Messages in Room",() => {
	// 	let client2
	// 	beforeEach(()=>{
	// 			client2 = io.connect(socketURL, options)
	// 			client2.on('connection', () => {
	// 				client2.join('/room/1')
	// 			})
	// 		return client2
	// 	})

	// 	it('User can write a messages in room', done => {

	// 		console.log('LINE 171', 'lalal')
	// 		client1.on('connection', (socket) => {
	// 		console.log('LINE 173',socket)
	// 			socket.join('/room/1')
	// 			socket.emit('postRoomMessage', ({nickname:'MattyAmazing',content:'Hi Princess Hyunjoo'},'/room/1'))
	// 		})

	// 		client1.on('connect', () => {
	// 		client1.on('postRoomMessage', (message,room) => {
	// 			console.log('LINE 178', message)
	// 			message.nickname.should.equal('MattyAmazing')
	// 			message.content.should.equal('Hi Princess Hyunjoo')
	//       client1.broadcast.to(room).emit('addMessage', message)

	// 		})
	// 		client1.on('addMessage', message => {
	// 			console.log('LINE 185', message)
	// 			message.nickname.should.equal('MattyAmazing')
	// 			message.content.should.equal('Hi Princess Hyunjoo')
	// 		})
	// 	})
	// 		// client2.on('addMessage', message => {
	// 		// 	message.nickname.should.equal('MattyAmazing')
	// 		// 	message.content.should.equal('HXncess Hyunjoo')
	// 		// 	message.content.should.not.equal('Hyunjoo is not a Princess')
	// 		// 	message.hello.should.be.false
	// 		// })
	// 		done()
	// 	})
	// })

})
