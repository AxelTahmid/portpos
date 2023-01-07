/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
	await knex.schema.createTable('customers', table => {
		table.increments('id')

		table.string('name').notNullable()
		table.string('email', 128).unique().notNullable()
		table.string('phone', 64).unique().notNullable()
		table.text('address').notNullable()

		table.timestamps(true, true)
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
	await knex.schema.dropTableIfExists('customers')
}
