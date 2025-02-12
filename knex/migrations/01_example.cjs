exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('example', (table) => {
    table.increments('id')
    table.string('name')
    table.double('type')
  })
}
exports.down = function (knex) {}

exports.config = { transaction: false }
