const router = require('express').Router()
const { Message, User} = require('../db/models')
module.exports = router

//get all the messages
router.get('/', (req, res, next) => {
  Message.findAll({include: [{
    model: User,
    attributes: ['nickname']
  }]})
    .then(messages => res.json(messages))
    .catch(next)
})

//posting new messages
router.post('/', (req, res, next) => {
    Message.create(req.body)
    .then(posted => {
        Message.findOne({
          where: {id:posted.id},
          include: [{model: User, attributes: ['nickname']}]
        })
        .then(message => res.json(message))
    })
    .catch(next)
})


