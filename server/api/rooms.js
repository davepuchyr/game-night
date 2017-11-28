const router = require('express').Router()
const {Room, User} = require('../db/models')
const {passport} = require('../index.js')
module.exports = router

// router.get('/', (req,res,next) => {
//   passport.authenticate('local',(err, user, info) => {
//     console.log('LINE 7' , err)
//     console.log('LINE 8', user)
//     console.log('LINE 9', info)
//       Room.findAll({
//         // explicitly select only the id and email fields - even though
//         // users' passwords are encrypted, it won't help if we just
//         // send everything to anyone who asks!
//         })
//         .then(allRooms => res.json(allRooms))
//         .catch(next)
//   })
// })

//type , name
router.post('/',  passport.authenticate('local',{failureRedirect: '/login'}),(req, res, next) => {
  let userId = req.body.adminId
  Room.create(req.body)
    .then(addedRoom => {
      addedRoom.addPlayers(userId)
      res.status(201)
      res.json(addedRoom)
    })
    .catch(error => console.log(error))
})

router.use((req, res, next) => {
  const error = new Error('Not Found in SERVER/ROOM')
  error.status = 404
  next(error)
})



router.get('/', (req, res, next) => {
  passport.authenticate('local',{successRedirect: '/api/rooms',failureRedirect: '/login'})(req, res, next)
      Room.findAll()
      .then(allRooms => res.json(allRooms))
      .catch(next)
});
