require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { CLIENT_ORIGIN } = require('./config')
const breweriesRouter = require('./breweries/breweries-router')
const beersRouter = require('./beers/beers-router')
const commentsRouter = require('./comments/comments-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/breweries', breweriesRouter)
app.use('/api/beers', beersRouter)
app.use('/api/comments', commentsRouter)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
      console.error(error)
      response = { message: error.message, error }
    }
  res.status(500).json(response)
 })

module.exports = app;
