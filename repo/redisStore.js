let redis = require('redis');
let client = redis.createClient();

let redisStore = {};

module.exports = redisStore;