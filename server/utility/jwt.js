/**
 * * check if logged in
 */
const authenticated = async (request, reply) => await request.jwtVerify()

module.exports = { authenticated }
