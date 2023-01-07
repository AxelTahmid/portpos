const {
	productList,
	productByID,
	createProduct,
	updateProduct,
	destroyProduct
} = require('./products.services')

/**
 * * Handler GET /v1/products/
 */
const showAll = async function (request, reply) {
	const data = await productList(this)

	reply.code(200)

	return {
		error: false,
		message: 'product List Fetched!',
		data
	}
}
/**
 * * Handler GET /v1/products/:id
 */
const show = async function (request, reply) {
	const data = await productByID(this, request.params.id)

	reply.code(200)
	return {
		error: false,
		message: `product: ${data.id} Fetched!`,
		data
	}
}
/**
 * * Handler POST /v1/products/
 */
const create = async function (request, reply) {
	const data = await createProduct(this, request.body)

	reply.code(201)

	return {
		error: false,
		message: 'product Created',
		data
	}
}
/**
 * * Handler PUT | PATCH /v1/products/:id
 */
const update = async function (request, reply) {
	const data = await updateProduct(this, request.params.id, request.body)

	reply.code(201)

	return {
		error: false,
		message: 'product Updated',
		data
	}
}
/**
 * * Handler DELETE /v1/products/:id
 */
const destroy = async function (request, reply) {
	const id = request.params.id

	await destroyProduct(this, id)

	reply.code(201)
	return {
		error: false,
		message: `product: ${id} deleted.`
	}
}

module.exports = { showAll, show, create, update, destroy }
