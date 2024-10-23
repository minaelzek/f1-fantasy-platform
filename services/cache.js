const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

async function cacheData(key, value, expiration = 3600) {
  return new Promise((resolve, reject) => {
    client.setex(key, expiration, JSON.stringify(value), (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

async function getData(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}

module.exports = {
  cacheData,
  getData,
};
