const wallet = require('./wallet.service')

const orderList = async app => {
	return await app
		.knex('orders')
		.leftJoin('products', 'orders.product_id', '=', 'products.id')
		.leftJoin('customers', 'orders.customer_id', '=', 'customers.id')
		.leftJoin('admins', 'orders.admin_id', '=', 'admins.id')
		.select(
			'orders.*',
			'products.name as product_name',
			'products.details as product_details',
			'customers.name as customer_name',
			'customers.email as customer_email',
			'customers.phone as customer_phone',
			'customers.address as customer_address',
			'admins.email as admin_email'
		)
		.orderBy('id', 'desc')
}

const orderByID = async (app, id) => {
	const order = await app
		.knex('orders')
		.where('orders.id', id)
		.leftJoin('products', 'orders.product_id', '=', 'products.id')
		.leftJoin('customers', 'orders.customer_id', '=', 'customers.id')
		.leftJoin('admins', 'orders.admin_id', '=', 'admins.id')
		.select(
			'orders.*',
			'products.name as product_name',
			'products.details as product_details',
			'customers.name as customer_name',
			'customers.email as customer_email',
			'customers.phone as customer_phone',
			'customers.address as customer_address',
			'admins.email as admin_email'
		)
		.first()

	if (!order) throw app.httpErrors.notFound(`order: ${id} not found!`)

	return order
}

const createOrder = async (app, props) => {
	const { amount, customer_id, product_id, admin_id } = props || {}

	const order = await app.knex('orders').insert({
		amount,
		customer_id,
		product_id,
		admin_id
	})

	const orderDetails = await orderByID(app, order)

	const walletData = await wallet.createInvoice(orderDetails)

	await app.knex('orders').where('id', order).update({
		invoice_id: walletData.invoice_id,
		payment_link: walletData.action.url
	})

	return await orderByID(app, order)
}

const updateOrder = async (app, id, props) => {
	const { amount, status, customer_id, product_id, admin_id } = props || {}

	const isUpdated = await app
		.knex('orders')
		.where('id', id)
		.update({ amount, status, customer_id, product_id, admin_id })

	if (!isUpdated) throw app.httpErrors.notFound(`order: ${id} not found!`)

	return await orderByID(app, id)
}

const destroyOrder = async (app, id) => {
	const isDeleted = await app.knex('orders').where('id', id).del()

	if (!isDeleted) throw app.httpErrors.notFound(`order: ${id} not found!`)

	return isDeleted
}

module.exports = {
	orderList,
	orderByID,
	createOrder,
	updateOrder,
	destroyOrder
}
