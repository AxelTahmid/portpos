// /* eslint-disable no-console */
// // const crypto = require('crypto')
// const axios = require('axios')
// const CryptoJS = require('crypto-js')

// const _appKey = 'db09e1518d5f4ebddc74db6877791573'
// const _secretKey = '882320eeca83f9e79e61cb9b15b57b81'

// // const PortWallet = require('@portwallet/nodejs-sdk')
// // const portPay = new PortWallet(_appKey, _secretKey, 'sandbox')

// /**
//  * * generates valid token for auth
//  */
// const _authToken = () => {
// 	const unixTime = Math.floor(Date.now() / 1000)
// 	// const toHash = _secretKey + unixTime
// 	// // const toHash = _secretKey + Date.now()

// 	// crypto.createHash('md5').update(toHash).digest('hex')

// 	// const token = _appKey + ':' + toHash

// 	// return Buffer.from(token).toString('base64')

// 	const Token = _appKey + ':' + CryptoJS.MD5(_secretKey + unixTime).toString()

// 	const wordArray = CryptoJS.enc.Utf8.parse(Token)
// 	const base64 = CryptoJS.enc.Base64.stringify(wordArray)
// 	return `Bearer ${base64}`
// }
// /**
//  * * Axios auth instance
//  */
// const _client = axios.create({
// 	baseURL: 'https://api-sandbox.portwallet.com/',
// 	timeout: 5000,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		Authorization: _authToken()
// 	}
// })

// console.log('token: ', 'Bearer ' + _authToken())

// const createInvoice = async data => {
// 	try {
// 		return await _client.post('payment/v2/invoice', data)
// 	} catch (error) {
// 		return error
// 	}
// }

// // const createInvoice = data => {
// // 	return _client
// // 		.post('payment/v2/invoice', data)
// // 		.then(data => {
// // 			return data.data
// // 		})
// // 		.catch(err => console.log(err.response?.data || err))
// // }
// // const customerObj = {
// // 	name: 'Mr Postpos',
// // 	email: 'ducky@postpos.com',
// // 	phone: '01761613788',
// // 	address: {
// // 		street: 'Dhaka',
// // 		city: 'Dhaka',
// // 		state: 'Dhaka',
// // 		zipcode: '1212',
// // 		country: 'BD'
// // 	}
// // }
// // const testObj = {
// // 	order: {
// // 		amount: 1200,
// // 		currency: 'BDT',
// // 		redirect_url: 'http://www.localhost.test/'
// // 	},
// // 	product: {
// // 		name: 'Duck',
// // 		description: 'quack quack..'
// // 	},
// // 	billing: {
// // 		customer: customerObj
// // 	},
// // 	shipping: {
// // 		customer: customerObj
// // 	}
// // }

// // console.log('invoice response: ', createInvoice(testObj))

// module.exports = {
// 	createInvoice
// }

/* eslint-disable no-console */
const _appKey = 'db09e1518d5f4ebddc74db6877791573'
const _secretKey = '882320eeca83f9e79e61cb9b15b57b81'

const PortWallet = require('@portwallet/nodejs-sdk')
const portPay = new PortWallet(_appKey, _secretKey, 'sandbox')

const createInvoice = async data => {
	try {
		return await portPay.invoice.create(data)
	} catch (error) {
		throw Error(error)
	}
}

module.exports = {
	createInvoice
}
