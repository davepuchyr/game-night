const router = require('express').Router()
const {Room} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Room.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    // attributes: ['id', 'email']
  })
    .then(allRooms => res.json(allRooms))
    .catch(next)
})

//type , name
router.post('/', (req, res, next) => {
  const addRoom = req.body;
  Room.create({addRoom})
    .then(addedRoom => res.json(addedRoom))
    .catch(next)
})

router.use((req, res, next) => {
  const error = new Error('Not Found in SERVER/ROOM')
  error.status = 404
  next(error)
})



