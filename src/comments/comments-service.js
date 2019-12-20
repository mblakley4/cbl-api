const CommentService = {
  getAllComments(knex) {
    return knex.select('*').from('cbl_comments')
  },
  insertComment(knex, newComment) {
    return knex
      .insert(newComment)
      .into('cbl_comments')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex
      .from('cbl_comments')
      .select('*')
      .where('id', id)
      .first()
  },
  deleteComment(knex, id) {
    return knex('cbl_comments')
      .where({ id })
      .delete()
  }
}

module.exports = CommentService
