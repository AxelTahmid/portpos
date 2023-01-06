const S = require('fluent-json-schema')

const { responseObject } = require('../../config/schema')

/**
 * * Schema GET /otp
 */
const s_otpKeys = {
	response: {
		200: responseObject(S.array().items(S.string()))
	}
}

module.exports = { s_otpKeys }
