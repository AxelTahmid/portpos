const {
	showAll,
	show,
	create,
	update,
	destroy
} = require('./customers.handlers')
const {
	s_showAll,
	s_show,
	s_create,
	s_update,
	s_destroy
} = require('./customers.schema')

module.exports = async function (fastify) {
	fastify.route({
		method: 'GET',
		url: '/',
		onRequest: fastify.authenticate,
		schema: s_showAll,
		handler: showAll
	})

	fastify.route({
		method: 'GET',
		url: '/:id',
		onRequest: fastify.authenticate,
		schema: s_show,
		handler: show
	})

	fastify.route({
		method: 'POST',
		url: '/',
		onRequest: fastify.authenticate,
		schema: s_create,
		handler: create
	})

	fastify.route({
		method: ['PUT', 'PATCH'],
		url: '/:id',
		onRequest: fastify.authenticate,
		schema: s_update,
		handler: update
	})

	fastify.route({
		method: 'DELETE',
		url: '/:id',
		onRequest: fastify.authenticate,
		schema: s_destroy,
		handler: destroy
	})
}
