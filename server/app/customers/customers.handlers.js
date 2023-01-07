const {
	customerList,
	customerByID,
	createCustomer,
	updateCustomer,
	destroyCustomer
} = require('./customers.services')

/**
 * * Handler GET /v1/customers/
 */
const showAll = async function (request, reply) {
	const data = await customerList(this)

	reply.code(200)

	return {
		error: false,
		message: 'customer List Fetched!',
		data
	}
}
/**
 * * Handler GET /v1/customers/:id
 */
const show = async function (request, reply) {
	const data = await customerByID(this, request.params.id)

	reply.code(200)
	return {
		error: false,
		message: `customer: ${data.email} Fetched!`,
		data
	}
}
/**
 * * Handler POST /v1/customers/
 */
const create = async function (request, reply) {
	const data = await createCustomer(this, request.body)

	reply.code(201)

	return {
		error: false,
		message: 'customer Created',
		data
	}
}
/**
 * * Handler PUT | PATCH /v1/customers/:id
 */
const update = async function (request, reply) {
	const data = await updateCustomer(this, request.params.id, request.body)

	reply.code(201)

	return {
		error: false,
		message: 'customer Updated',
		data
	}
}
/**
 * * Handler DELETE /v1/customers/:id
 */
const destroy = async function (request, reply) {
	const id = request.params.id

	await destroyCustomer(this, id)

	reply.code(201)
	return {
		error: false,
		message: `customer: ${id} deleted.`
	}
}

module.exports = { showAll, show, create, update, destroy }
