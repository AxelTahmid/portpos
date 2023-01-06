const authPublicRoutes = require('./auth/public')
const userCustomerRoutes = require('./user/customer')

module.exports = async function (app) {
	app.setNotFoundHandler(function (request, reply) {
		reply.code(404).send({ error: true, message: '404 - Route Not Found' })
	})
	app.get('/', async (request, reply) => {
		return { backend: 'welcome to api service' }
	})
	/**
	 * * Service Routes Registration with Prefix
	 */
	app
		.register(authPublicRoutes, { prefix: '/v1/auth' })
		.register(userCustomerRoutes, { prefix: '/v1/user/customer' })
}
