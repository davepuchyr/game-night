import io from 'socket.io-client'

let should = require('should')
let socketURL = 'http://0.0.0.0:3000'
let options = {
	transports: ['websocket'],
	'force new connection': true
}

let user1 = {'1':1, 'nickname':'MattyAmazing'}
let user2 = {'2':2, 'nickname':'KingJoshua'}
let user3 = {'3':3, 'nickname':'JSMasterTim'}
let user4 = {'3':4, 'nickname':'PrincessHyunjoo'}

describe("Lobby receives messages",() => {

	it('Should broadcast to all users', done => {
		let client1 = io.connect(socketURL, options)

		client1.on('connection', socket => {
	    let socketId = socket.id

			client1.emit('userConnect', user1)

			/* Since first client is connected, we connect
			the second client. */
			let client2 = io.connect(socketURL, options)

			client2.on('connection', socket => {
				client2.emit('userConnect', user2)
			})

			// client2.on('disconnect', () => {
			// 	usersName.should.equal(user2.nickname + " has joined.")
			// 	client2.disconnect()
			// })

		})
		done()
	})
})

