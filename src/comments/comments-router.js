const express = require('express')
const xss = require('xss')
const path = require('path')
const CommentService = require('./comments-service')

const commentsRouter = express.Router()
const jsonParser = express.json()

const serializeComment = comment => ({
  id: comment.id,
  text: xss(comment.text),
  user_name: xss(comment.user_name),
  beer_id: comment.beer_id,
})

commentsRouter
  .route('/')
  .get((req, res, next) => {
    CommentService.getAllComments(
      req.app.get('db')
    )
    .then(comments => {
      res.json(comments)
    })
    .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { text, user_name, beer_id } = req.body
    const newComment = { text, user_name, beer_id }

    for (const [key, value] of Object.entries(newComment)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    CommentService.insertComment(
      req.app.get('db'),
      newComment
    )
    .then(comment => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${comment.id}`))
        .json(serializeComment(comment))
    })
    .catch(next)
  })

commentsRouter
  .route('/:comment_id')
  .all((req, res, next) => {
    CommentService.getById(
      req.app.get('db'),
      req.params.comment_id
    )
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          error: { message: `comment doesn't exist` }
        })
      }
      res.comment = comment
      next()
    })
    .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.comment)
  })
  .delete((req, res, next) => {
    const { comment_id } = req.params
    CommentService.deleteComment(
      req.app.get('db'),
      comment_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = commentsRouter
