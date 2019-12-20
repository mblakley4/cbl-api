const BreweryService = {
  getAllBreweries(knex) {
    return knex.select('*').from('cbl_breweries')
  },
  insertBrewery(knex, newBrewery) {
    return knex
      .insert(newBrewery)
      .into('cbl_breweries')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex
      .from('cbl_breweries')
      .select('*')
      .where('id', id)
      .first()
  },
  updateBrewery(knex, id, updatedBrewery) {
    return knex
      .from('cbl_breweries')
      .where({ id })
      .update(updatedBrewery)
  },
  deleteBrewery(knex, id) {
    return knex('cbl_breweries')
      .where({ id })
      .delete()
  }
}

module.exports = BreweryService
