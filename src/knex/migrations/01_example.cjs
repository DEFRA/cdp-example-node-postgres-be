exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('example', (table) => {
    table.increments('id')
    table.string('name')
    table.double('type')
  })
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
exports.down = function () {}

exports.config = { transaction: false }
