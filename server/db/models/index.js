const User = require('./user');
const Room = require('./room');
const Message = require('./message');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//Room Associations
Room.belongsTo(User, { as: 'admin' });
Room.belongsToMany(User, { as: 'players', through: 'room_players' });

//Message Associations
User.hasMany(Message); //message has the userId
Message.belongsTo(User,{individualHooks:true});

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Room,
  Message
};