const {
	orderList,
	orderByID,
	createOrder,
	updateOrder,
	destroyOrder
} = require('./order.services')

/**
 * * Handler GET /v1/orders/
 */
const showAll = async function (request, reply) {
	const data = await orderList(this)

	reply.code(200)

	return {
		error: false,
		message: 'order List Fetched!',
		data
	}
}
/**
 * * Handler GET /v1/orders/:id
 */
const show = async function (request, reply) {
	const data = await orderByID(this, request.params.id)

	reply.code(200)
	return {
		error: false,
		message: `order: ${data.id} Fetched!`,
		data
	}
}
/**
 * * Handler POST /v1/orders/
 */
const create = async function (request, reply) {
	const data = await createOrder(this, {
		...request.body,
		admin_id: request.user.id
	})

	reply.code(201)

	return {
		error: false,
		message: 'order Created',
		data
	}
}
/**
 * * Handler PUT | PATCH /v1/orders/:id
 */
const update = async function (request, reply) {
	const data = await updateOrder(this, request.params.id, {
		...request.body,
		admin_id: request.user.id
	})

	reply.code(201)

	return {
		error: false,
		message: 'order Updated',
		data
	}
}
/**
 * * Handler DELETE /v1/orders/:id
 */
const destroy = async function (request, reply) {
	const id = request.params.id

	await destroyOrder(this, id)

	reply.code(201)
	return {
		error: false,
		message: `order: ${id} deleted.`
	}
}

module.exports = { showAll, show, create, update, destroy }
