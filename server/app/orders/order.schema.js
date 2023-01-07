const S = require('fluent-json-schema')

const { responseObject, responseListObject } = require('../../config/schema')
// const { customerObj } = require('../customers/customers.schema')
// const { productObj } = require('../products/products.schema')

const orderObj = S.object()
	.prop('id', S.number())
	.prop('status', S.enum(['Pending', 'Paid', 'Fulfilled', 'Refund']))
	.prop('invoice_id', S.string())
	.prop('amount', S.number())
	.prop('payment_link', S.string())
	.prop('customer_id', S.number())
	.prop('customer_name', S.string())
	.prop('customer_email', S.string())
	.prop('customer_phone', S.string())
	.prop('customer_address', S.string())
	.prop('product_id', S.number())
	.prop('product_name', S.string())
	.prop('product_details', S.string())
	.prop('admin_email', S.string())
	.prop('created_at', S.string().format('date'))
	.prop('updated_at', S.string().format('date'))

/**
 * * Schema GET /v1/orders/
 */
const s_showAll = {
	response: { 200: responseListObject(orderObj) }
}
/**
 * * Schema GET /v1/orders/:id
 */
const s_show = {
	params: S.object().prop('id', S.number().required()),
	response: { 200: responseObject(orderObj) }
}
/**
 * * Schema POST /v1/orders/
 */
const s_create = {
	body: orderObj.only(['amount', 'customer_id', 'product_id']),
	response: { 201: responseObject(orderObj) }
}
/**
 * * Schema PUT | PATCH /v1/orders/:id
 */

const s_update = {
	params: S.object().prop('id', S.number().required()),
	body: orderObj,
	response: { 201: responseObject(orderObj) }
}
/**
 * * Schema DELETE /v1/orders/:id
 */
const s_destroy = {
	params: S.object().prop('id', S.number().required()),
	response: { 201: responseObject() }
}

module.exports = {
	s_showAll,
	s_show,
	s_create,
	s_update,
	s_destroy,
	orderObj
}
