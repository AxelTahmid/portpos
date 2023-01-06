/**
 * * check if logged in
 */
const authenticated = async (request, reply) => {
	await request.jwtVerify()
	if (request.user.is_banned) {
		reply.code(403)
		throw Error(`${request.user.email} is banned.`)
	}
}

module.exports = { authenticated }
