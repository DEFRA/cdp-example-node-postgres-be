export function up(knex) {
  return knex.schema.createTableIfNotExists('blah', (table) => {
    table.increments('id')
    table.string('name')
    table.double('type')
  })
}

export function down(knex) {}

export const config = { transaction: false }
