/**
 * * Fetch User by Email
 */
const fetchUser = async (app, id) => {
	const user = await app.knex('user_customers').where('id', id).first()

	if (!user) throw app.httpErrors.notFound('User not found!')

	return user
}
/**
 * * Authenticate passed user
 */
const authenticate = async (app, props) => {
	const { email, password } = props || {}
	const key = `acs:timeout:${email}`
	let count = await app.cache.get(key)
	if (count >= 5) {
		throw app.httpErrors.forbidden('5 Wrong Attempts! Try again in 5 minutes.')
	}

	const user = await app.knex('user_customers').where('email', email).first()

	if (!user) throw app.httpErrors.notFound(`User: ${email}, not found!`)

	const match = await app.bcrypt.compare(password, user.password)

	if (!match) {
		count++
		await app.redis.setex(key, 300, count.toString())
		throw app.httpErrors.forbidden('Password Incorrect!')
	}

	return await app.auth.token(user)
}
/**
 * * Create User via Registration
 */
const registration = async (app, props) => {
	let { email, password } = props || {}

	const user = await app.knex('user_customers').where('email', email).first()

	if (user)
		throw app.httpErrors.badRequest(
			`User: ${email} already exists! Please Login`
		)

	password = await app.bcrypt.hash(password)

	return await app.knex('user_customers').insert({ email, password })
}

const updateUserPassword = async (app, props) => {
	const { email, password } = props || {}

	const hashedPassword = await app.bcrypt.hash(password)

	const isUpdated = await app
		.knex('user_customers')
		.where('email', email)
		.update({ password: hashedPassword })

	if (!isUpdated) throw app.httpErrors.notFound(`User: ${email}, not found!`)
}

/**
 * * Generate OTP Code
 */
const getOTP = async (app, email) => {
	const otp = Math.random().toString().substring(2, 8)

	//* 30 minute expiry
	await app.redis.setex(`acs:otp:${email}`, 1800, otp)
	return otp
}
/**
 * * Verify OTP Code
 */
const verifyOTP = async (app, props) => {
	const key = `acs:otp:${props.email}`

	const otp = await app.redis.get(key)

	// eslint-disable-next-line eqeqeq
	if (otp && otp == props.code) {
		await app.redis.del(key)
		return true
	} else {
		return false
	}
}

module.exports = {
	registration,
	authenticate,
	fetchUser,
	getOTP,
	verifyOTP,
	updateUserPassword
}
