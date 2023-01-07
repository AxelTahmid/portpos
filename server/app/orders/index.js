const { showAll, show, create, update, destroy } = require('./order.handlers')
const {
	s_showAll,
	s_show,
	s_create,
	s_update,
	s_destroy
} = require('./order.schema')

module.exports = async function (app) {
	app.route({
		method: 'GET',
		url: '/',
		onRequest: app.authenticate,
		schema: s_showAll,
		handler: showAll
	})

	app.route({
		method: 'GET',
		url: '/:id',
		onRequest: app.authenticate,
		schema: s_show,
		handler: show
	})

	app.route({
		method: 'POST',
		url: '/',
		onRequest: app.authenticate,
		// schema: s_create,
		handler: create
	})

	app.route({
		method: ['PUT', 'PATCH'],
		url: '/:id',
		onRequest: app.authenticate,
		schema: s_update,
		handler: update
	})

	app.route({
		method: 'DELETE',
		url: '/:id',
		onRequest: app.authenticate,
		schema: s_destroy,
		handler: destroy
	})
}
