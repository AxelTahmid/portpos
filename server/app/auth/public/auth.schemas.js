const {
	emailPassObj,
	userObject,
	responseObject
} = require('../../../config/schema')

/**
 * * POST /v1/auth/login
 */
const loginSchema = {
	body: emailPassObj,
	response: { 200: responseObject() }
}
/**
 * * POST /v1/auth/register
 */
const registerSchema = {
	body: emailPassObj,
	response: { 201: responseObject() }
}
/**
 * * GET /v1/auth/me
 */
const meSchema = {
	response: {
		200: responseObject(userObject)
	}
}

module.exports = {
	loginSchema,
	registerSchema,
	meSchema
}
