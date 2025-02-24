const Redis = require('redis');
const { redis } = require('./config');

const url = `redis://${redis.host}:${redis.port}`;
const usePassword = redis.usePassword.toUpperCase() === "YES"

const client = Redis.createClient({
	url,
	...(usePassword && { password: redis.password })
})

module.exports = client;
