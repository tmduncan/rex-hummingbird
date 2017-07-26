const urlstore = require('./urlstore');
const redis = require('redis');

const redisUrl = process.env.REDIS_URL || 'redis://redis:6379';
const redisClient = redis.createClient(redisUrl);

afterAll(() => {
  redisClient.quit();
});

test('urlstore can add and fetch data', () => {
  expect.assertions(1);
  return urlstore
    .addShortUrl(redisClient, 'fb1', 'http://fb1.com')
    .then(() => urlstore.getShortUrl(redisClient, 'fb1'))
    .then(() => urlstore.addShortUrl(redisClient, 'fb2', 'http://fb2.com'))
    .then(() => urlstore.addShortUrl(redisClient, 'fb3', 'http://fb3.com'))
    .then(() => urlstore.listShortUrls(redisClient))
    .then(res => expect(res).toBeTruthy())
    .catch((e) => { throw e; });
});
