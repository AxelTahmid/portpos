const base = async function (request, reply) {
	let data = await this.cache.get('acs:root')

	if (!data) {
		data = {
			API: 'Welcome to Service',
			Redis: 'Waiting'
		}
		this.cache.set('acs:root', {
			API: 'Welcome to Service',
			Redis: 'Connected'
		})
	}

	reply.code(200)
	return {
		error: false,
		message: data
	}
}

const otpKeys = async function (request, reply) {
	const data = await this.cache.get_pattern('acs:otp*')

	reply.code(200)
	return {
		error: false,
		message: data.length ? 'All OTP in circulation' : 'No OTP in ciruclation',
		data
	}
}

const redisData = async function (request, reply) {
	const key = request.body.key

	const data = await this.cache.get(key)

	reply.code(200)
	return {
		error: false,
		message: `Data for Redis ${key}`,
		data
	}
}

const flushRedis = async function (request, reply) {
	await this.redis.flushall('SYNC', (error, data) => {
		if (error) this.log.error(error)
		if (data === 'OK') {
			this.log.info('Redis Cache flushed.')
		}
	})

	reply.code(200)
	return {
		error: false,
		message: 'Redis globally flushed'
	}
}

module.exports = { base, otpKeys, redisData, flushRedis }
