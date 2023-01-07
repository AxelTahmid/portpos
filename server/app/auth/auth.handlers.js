const { registration, authenticate, fetchUser } = require('./auth.services')

/**
 * * POST /v1/auth/login
 */
const login = async function (request, reply) {
	const token = await authenticate(this, request.body)

	reply.code(200)
	return {
		error: false,
		message: 'Login Sucessful',
		data: { token }
	}
}

/**
 * * POST /v1/auth/register
 */
const register = async function (request, reply) {
	await registration(this, request.body)

	reply.code(201)
	return {
		error: false,
		message: 'Registration Sucessful'
	}
}

/**
 * * GET /v1/auth/me
 */
const me = async function (request, reply) {
	const data = await fetchUser(this, request.user.id)

	reply.code(200)
	return {
		error: false,
		message: 'User Fetched!',
		data
	}
}

module.exports = {
	login,
	register,
	me
}
