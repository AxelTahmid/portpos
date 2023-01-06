module.exports = {
	cors: {
		origin: [
			/\.arektacoinstore\.com$/,
			'https://arektacoinstore.com',
			'https://admin.arektacoinstore.com',
			'https://dev.arektacoinstore.com',
			'https://api.arektacoinstore.com',
			'http://localhost:3001',
			'http://localhost:3000'
		],
		method: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Access-Control-Allow-Origin',
			'Origin'
		],
		credentials: true,
		optionsSuccessStatus: 200
	},
	sql: {
		client: 'mysql2',
		acquireConnectionTimeout: 10000,
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			port: process.env.DB_PORT
		},
		asyncStackTraces: false,
		debug: false
	}
}
