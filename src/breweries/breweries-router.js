const express = require('express')
const xss = require('xss')
const path = require('path')
const BreweryService = require('./breweries-service')

const breweriesRouter = express.Router()
const jsonParser = express.json()

const serializeBrewery = brewery => ({
  id: brewery.id,
  name: xss(brewery.name),
  city: xss(brewery.city),
  us_state: brewery.us_state,
  imgage: xss(brewery.image),
})

breweriesRouter
  .route('/')
  .get((req, res, next) => {
    BreweryService.getAllBreweries(
      req.app.get('db')
    )
    .then(breweries => {
      res.json(breweries)
    })
    .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, city, us_state, image } = req.body
    const checkBrewery = { name, city, us_state }

    for (const [key, value] of Object.entries(checkBrewery)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    const newBrewery = {...checkBrewery, image }
    BreweryService.insertBrewery(
      req.app.get('db'),
      newBrewery
    )
    .then(brewery => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${brewery.id}`))
        .json(serializeBrewery(brewery))
    })
    .catch(next)
  })

breweriesRouter
  .route('/:brewery_id')
  .all((req, res, next) => {
    BreweryService.getById(
      req.app.get('db'),
      req.params.brewery_id
    )
    .then(brewery => {
      if (!brewery) {
        return res.status(404).json({
          error: { message: `Brewery doesn't exist` }
        })
      }
      res.brewery = brewery
      next()
    })
    .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeBrewery(res.brewery))
  })
  .patch(jsonParser, (req, res, next) => {
    const { name, city, us_state, image } = req.body
    const breweryToUpdate = { name, city, us_state, image }

    const numberOfValues = Object.values(breweryToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
     return res.status(400).json({
       error: {
         message: `Request body must contain brewery information needing updated'`
       }
     })
    }

    BreweryService.updateBrewery(
      req.app.get('db'),
      req.params.brewery_id,
      breweryToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    const { brewery_id } = req.params
    BreweryService.deleteBrewery(
      req.app.get('db'),
      brewery_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = breweriesRouter
