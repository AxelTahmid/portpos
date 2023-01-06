const bcrypt = require('../../../plugins/bcrypt')

const {
	login,
	register,
	me,
	requestOTP,
	resetPassword
} = require('./auth.handlers')
const {
	loginSchema,
	registerSchema,
	meSchema,
	requestOTPSchema,
	resetPasswordSchema
} = require('./auth.schemas')

module.exports = async function (fastify) {
	fastify.register(bcrypt)

	fastify.route({
		method: 'POST',
		url: '/register',
		schema: registerSchema,
		handler: register
	})

	fastify.route({
		method: 'POST',
		url: '/login',
		schema: loginSchema,
		handler: login
	})

	fastify.route({
		method: 'GET',
		url: '/me',
		onRequest: fastify.authenticate,
		schema: meSchema,
		handler: me
	})

	fastify.route({
		method: 'POST',
		url: '/otp-code',
		onRequest: fastify.authenticate,
		schema: requestOTPSchema,
		handler: requestOTP
	})

	fastify.route({
		method: 'POST',
		url: '/reset-password',
		schema: resetPasswordSchema,
		handler: resetPassword
	})
}
