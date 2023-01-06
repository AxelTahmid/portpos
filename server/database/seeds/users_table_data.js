/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * * npx knex seed:run --specific=users_table_data.js
 */
exports.seed = async function (knex) {
	// pass is 123456
	await knex('users').insert([
		{
			email: 'admin@portpos.com',
			password: '$2a$10$mYKo/KMUnAWpS5hZkAmyyuwocUTNKv1dYrJC534cT7TJ/1.cSeSF2'
		}
	])
}
