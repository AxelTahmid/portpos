const authRoutes = require('./auth')
const customerRoutes = require('./customers')
const productRoutes = require('./products')
const orderRoutes = require('./orders')

module.exports = async function (app) {
	app.setNotFoundHandler(function (request, reply) {
		reply.code(404).send({ error: true, message: '404 - Route Not Found' })
	})
	app.get('/', async (request, reply) => {
		return { Portpos: 'welcome to api service' }
	})
	/**
	 * * Service Routes Registration with Prefix
	 */
	app
		.register(authRoutes, { prefix: '/v1/auth' })
		.register(customerRoutes, { prefix: '/v1/customer' })
		.register(productRoutes, { prefix: '/v1/product' })
		.register(orderRoutes, { prefix: '/v1/order' })
}
