const bcrypt = require('../../plugins/bcrypt')

const { login, register, me } = require('./auth.handlers')
const { loginSchema, registerSchema, meSchema } = require('./auth.schemas')

module.exports = async function (app) {
	app.register(bcrypt)

	app.route({
		method: 'POST',
		url: '/register',
		schema: registerSchema,
		handler: register
	})

	app.route({
		method: 'POST',
		url: '/login',
		schema: loginSchema,
		handler: login
	})

	app.route({
		method: 'GET',
		url: '/me',
		onRequest: app.authenticate,
		schema: meSchema,
		handler: me
	})
}
