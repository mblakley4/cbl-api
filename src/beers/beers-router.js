const express = require('express')
const xss = require('xss')
const path = require('path')
const BeerService = require('./beers-service')

const beersRouter = express.Router()
const jsonParser = express.json()

const serializeBeer = beer => ({
  id: beer.id,
  name: xss(beer.name),
  style: xss(beer.style),
  ABV: xss(beer.ABV),
  IBU: xss(beer.IBU),
  description: xss(beer.description),
  beerColor: beer.beerColor,
  rating: beer.rating,
  breweryId: beer.breweryId,
})

beersRouter
  .route('/')
  .get((req, res, next) => {
    BeerService.getAllBeers(
      req.app.get('db')
    )
    .then(beers => {
      res.json(beers)
    })
    .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, style, abv, ibu, description, beer_color, rating, brewery_id } = req.body
    const checkBeer = { name, style, beer_color, rating, brewery_id }

    for (const [key, value] of Object.entries(checkBeer)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    const newBeer = {...checkBeer, abv, ibu, description }
    BeerService.insertBeer(
      req.app.get('db'),
      newBeer
    )
    .then(beer => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${beer.id}`))
        .json(serializeBeer(beer))
    })
    .catch(next)
  })

beersRouter
  .route('/:beer_id')
  .all((req, res, next) => {
    BeerService.getById(
      req.app.get('db'),
      req.params.beer_id
    )
    .then(beer => {
      if (!beer) {
        return res.status(404).json({
          error: { message: `beer doesn't exist` }
        })
      }
      res.beer = beer
      next()
    })
    .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.beer)
  })
  .patch(jsonParser, (req, res, next) => {
    const { name, style, ABV, IBU, description, beerColor, rating, breweryId } = req.body
    const beerToUpdate = { name, style, ABV, IBU, description, beerColor, rating, breweryId }

    const numberOfValues = Object.values(beerToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
     return res.status(400).json({
       error: {
         message: `Request body must contain beer information needing updated'`
       }
     })
    }

    BeerService.updateBeer(
      req.app.get('db'),
      req.params.beer_id,
      beerToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    const { beer_id } = req.params
    BeerService.deleteBeer(
      req.app.get('db'),
      beer_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = beersRouter
