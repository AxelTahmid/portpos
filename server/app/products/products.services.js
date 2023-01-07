const productList = async app => {
	return await app.knex('products')
}

const productByID = async (app, id) => {
	const product = await app.knex('products').where('id', id).first()

	if (!product) throw app.httpErrors.notFound(`product: ${id} not found!`)

	return product
}

const createProduct = async (app, props) => {
	const { name, details } = props || {}

	const product = await app.knex('products').insert({ name, details })

	return await productByID(app, product)
}

const updateProduct = async (app, id, props) => {
	const { name, details } = props || {}

	const isUpdated = await app
		.knex('products')
		.where('id', id)
		.update({ name, details })

	if (!isUpdated) throw app.httpErrors.notFound(`product: ${id} not found!`)

	return await productByID(app, id)
}

const destroyProduct = async (app, id) => {
	const isDeleted = await app.knex('products').where('id', id).del()

	if (!isDeleted) throw app.httpErrors.notFound(`product: ${id} not found!`)

	return isDeleted
}

module.exports = {
	productList,
	productByID,
	createProduct,
	updateProduct,
	destroyProduct
}
