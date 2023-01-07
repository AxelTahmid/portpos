/**
 * * Fetch User by Email
 */
const fetchUser = async (app, id) => {
	const user = await app.knex('admins').where('id', id).first()

	if (!user) throw app.httpErrors.notFound('User not found!')

	return user
}
/**
 * * Authenticate passed user
 */
const authenticate = async (app, props) => {
	const { email, password } = props || {}

	const user = await app.knex('admins').where('email', email).first()

	if (!user) throw app.httpErrors.notFound(`User: ${email}, not found!`)

	const match = await app.bcrypt.compare(password, user.password)

	if (!match) {
		throw app.httpErrors.forbidden('Password Incorrect!')
	}

	return await app.auth.token(user)
}
/**
 * * Create User via Registration
 */
const registration = async (app, props) => {
	let { email, password } = props || {}

	const user = await app.knex('admins').where('email', email).first()

	if (user)
		throw app.httpErrors.badRequest(
			`User: ${email} already exists! Please Login`
		)

	password = await app.bcrypt.hash(password)

	return await app.knex('admins').insert({ email, password })
}

module.exports = {
	registration,
	authenticate,
	fetchUser
}
