/* eslint-disable */
const urlstore = require("./urlstore");
const redis = require("redis");

const redisUrl = process.env.REDIS_URL || "redis://redis:6379";
const redisClient = redis.createClient(redisUrl);

afterAll(() => {
  redisClient.quit();
});

test('urlstore can add and fetch data',() => {
  expect.assertions(1);
  return urlstore
    .addShortUrl(redisClient, 'fb1', 'http://fb1.com')
    .then(() => {
      return urlstore.getShortUrl(redisClient, 'fb1');
    })
    .then(() => {
      return urlstore.addShortUrl(redisClient, 'fb2', 'http://fb2.com');
    })
    .then(() => {
      return urlstore.addShortUrl(redisClient, 'fb3', 'http://fb3.com');
    })
    .then(() => {
      return urlstore.listShortUrls(redisClient);
    })
    .then(res => {
      return expect(res).toBeTruthy();
    })
    .catch(e => { throw e });
});