/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
	await knex.schema.createTable('orders', table => {
		table.increments('id')
		table.integer('amount').notNullable()
		table.string('invoice_id')
		table.text('payment_link')
		table
			.enu('status', ['Pending', 'Paid', 'Fulfilled', 'Refund'])
			.defaultTo('Pending')

		table.integer('product_id').unsigned()
		table
			.foreign('product_id')
			.references('id')
			.inTable('products')
			.onDelete('CASCADE')

		table.integer('customer_id').unsigned()
		table
			.foreign('customer_id')
			.references('id')
			.inTable('customers')
			.onDelete('CASCADE')

		table.integer('admin_id').unsigned()
		table
			.foreign('admin_id')
			.references('id')
			.inTable('admins')
			.onDelete('SET NULL')

		table.timestamps(true, true)
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
	await knex.schema.dropTableIfExists('orders')
}
