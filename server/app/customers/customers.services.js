const customerList = async app => {
	return await app.knex('customers')
}

const customerByID = async (app, id) => {
	const customer = await app.knex('customers').where('id', id).first()

	if (!customer) throw app.httpErrors.notFound(`customer: ${id} not found!`)

	return customer
}

const createCustomer = async (app, props) => {
	const { name, email, phone, address } = props || {}

	let customer = await app
		.knex('customers')
		.where('email', email)
		.orWhere('phone', phone)
		.first()

	if (customer) throw app.httpErrors.badRequest('customer exists!')

	customer = await app.knex('customers').insert({ name, email, phone, address })

	return await customerByID(app, customer)
}

const updateCustomer = async (app, id, props) => {
	const { name, email, phone, address } = props || {}

	const isUpdated = await app
		.knex('customers')
		.where('id', id)
		.update({ name, email, phone, address })

	if (!isUpdated) throw app.httpErrors.notFound(`customer: ${id} not found!`)

	return await customerByID(app, id)
}

const destroyCustomer = async (app, id) => {
	const isDeleted = await app.knex('customers').where('id', id).del()

	if (!isDeleted) throw app.httpErrors.notFound(`customer: ${id} not found!`)

	return isDeleted
}

module.exports = {
	customerList,
	customerByID,
	createCustomer,
	updateCustomer,
	destroyCustomer
}
