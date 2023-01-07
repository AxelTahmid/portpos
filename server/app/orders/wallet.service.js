const _appKey = 'db09e1518d5f4ebddc74db6877791573'
const _secretKey = '882320eeca83f9e79e61cb9b15b57b81'

const PortWallet = require('@portwallet/nodejs-sdk')
const portPay = new PortWallet(_appKey, _secretKey, 'sandbox')

const createInvoice = async data => {
	try {
		const customerObj = {
			name: data.customer_name,
			email: data.customer_email,
			phone: data.customer_phone,
			address: {
				street: 'Badda',
				city: 'Dhaka',
				state: 'Dhaka',
				zipcode: '1212',
				country: 'BD'
			}
		}
		// JSON.parse(data.customer_address)
		const reqObj = {
			order: {
				amount: data.amount,
				currency: 'BDT',
				redirect_url: 'http://www.localhost.test/'
			},
			product: {
				name: data.product_name,
				description: data.product_details
			},
			billing: {
				customer: customerObj
			},
			shipping: {
				customer: customerObj
			}
		}

		return await portPay.invoice.create(reqObj)
	} catch (error) {
		throw Error(error)
	}
}

module.exports = {
	createInvoice
}
