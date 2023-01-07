const S = require('fluent-json-schema')

const { responseObject, responseListObject } = require('../../config/schema')

const customerObj = S.object()
	.prop('id', S.number())
	.prop('name', S.string())
	.prop('email', S.string())
	.prop('phone', S.string())
	.prop('address', S.string())
	.prop('created_at', S.string().format('date'))
	.prop('updated_at', S.string().format('date'))

/**
 * * Schema GET /v1/customers/
 */
const s_showAll = {
	response: { 200: responseListObject(customerObj) }
}
/**
 * * Schema GET /v1/customers/:id
 */
const s_show = {
	params: S.object().prop('id', S.number().required()),
	response: { 200: responseObject(customerObj) }
}
/**
 * * Schema POST /v1/customers/
 */
const s_create = {
	body: customerObj.only(['name', 'email', 'phone', 'address']),
	response: { 201: responseObject(customerObj) }
}
/**
 * * Schema PUT | PATCH /v1/customers/:id
 */

const s_update = {
	params: S.object().prop('id', S.number().required()),
	body: customerObj,
	response: { 201: responseObject(customerObj) }
}
/**
 * * Schema DELETE /v1/customers/:id
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
	customerObj
}
