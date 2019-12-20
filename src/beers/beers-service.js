const BeerService = {
  getAllBeers(knex) {
    return knex.select('*').from('cbl_beers')
  },
  insertBeer(knex, newBeer) {
    return knex
      .insert(newBeer)
      .into('cbl_beers')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex
      .from('cbl_beers')
      .select('*')
      .where('id', id)
      .first()
  },
  updateBeer(knex, id, updatedBeer) {
    return knex
      .from('cbl_beers')
      .where({ id })
      .update(updatedBeer)
  },
  deleteBeer(knex, id) {
    return knex('cbl_beers')
      .where({ id })
      .delete()
  }
}

module.exports = BeerService
