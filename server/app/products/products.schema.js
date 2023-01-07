const S = require('fluent-json-schema')

const { responseObject, responseListObject } = require('../../config/schema')

const productObj = S.object()
	.prop('id', S.number())
	.prop('name', S.string())
	.prop('details', S.string())
	.prop('created_at', S.string().format('date'))
	.prop('updated_at', S.string().format('date'))

/**
 * * Schema GET /v1/products/
 */
const s_showAll = {
	response: { 200: responseListObject(productObj) }
}
/**
 * * Schema GET /v1/products/:id
 */
const s_show = {
	params: S.object().prop('id', S.number().required()),
	response: { 200: responseObject(productObj) }
}
/**
 * * Schema POST /v1/products/
 */
const s_create = {
	body: productObj.only(['name', 'details']),
	response: { 201: responseObject(productObj) }
}
/**
 * * Schema PUT | PATCH /v1/products/:id
 */

const s_update = {
	params: S.object().prop('id', S.number().required()),
	body: productObj,
	response: { 201: responseObject(productObj) }
}
/**
 * * Schema DELETE /v1/products/:id
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
	productObj
}
