// Create a custom migration source class
class MigrationSource {
  // Must return a Promise containing a list of migrations.
  // Migrations can be whatever you want,
  // they will be passed as arguments to getMigrationName
  // and getMigration
  getMigrations() {
    // In this example we are just returning migration names
    return Promise.resolve(['example'])
  }

  getMigrationName(migration) {
    return migration
  }

  getMigration(migration) {
    switch (migration) {
      case 'example':
        return {
          up(knex) {
            return knex.schema.hasTable('example').then(function (exists) {
              if (!exists) {
                return knex.schema.createTable('example', function (table) {
                  table.increments('id').primary()
                  table.string('name')
                  table.text('type')
                })
              }
            })
          },
          down(knex) {
            return knex.dropTableIfExists('example')
          }
        }
    }
  }
}

export { MigrationSource }
