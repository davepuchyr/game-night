const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session')
const path = require('path');
const PORT = process.env.PORT || 1337;
const app = express();

module.exports = app;

if (process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())
    
  // session middleware with passport
//   app.use(session({
//     secret: process.env.SESSION_SECRET || 'my best friend is Cody',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false
//   }));

  // auth and api routes
//   app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  .use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
};

createApp();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));