const { base, otpKeys, redisData, flushRedis } = require('./handlers')
const { s_otpKeys } = require('./schema')

module.exports = async function (fastify) {
	fastify.route({
		method: 'GET',
		url: '/',
		handler: base
	})

	fastify.route({
		method: 'POST',
		url: '/otp',
		onRequest: fastify.role.restricted,
		schema: s_otpKeys,
		handler: otpKeys
	})

	fastify.route({
		method: 'POST',
		url: '/redis',
		onRequest: fastify.role.restricted,
		handler: redisData
	})

	fastify.route({
		method: 'POST',
		url: '/flush',
		onRequest: fastify.role.restricted,
		handler: flushRedis
	})
}
