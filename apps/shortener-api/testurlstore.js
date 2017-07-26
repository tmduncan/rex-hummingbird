'use strict';

var redisUrl = process.env.REDIS_URL || "redis://redis:6379";

var redis = require("redis"),
  redisClient = redis.createClient(redisUrl);

redisClient.on('error', function (err) {
  console.log('error event - ' + client.host + ':' + client.port + ' - ' + err);
});

var urlstore = require("./urlstore");


try {
  urlstore.addShortUrl(redisClient, 'fb1', 'http://fb1.com').then(
    () => {
      return urlstore.getShortUrl(redisClient, 'fb1');
    }
  ).then(
    () => {
      return urlstore.addShortUrl(redisClient, 'fb2', 'http://fb2.com');
    }
  ).then(
    () => {
      return urlstore.addShortUrl(redisClient, 'fb3', 'http://fb3.com');
    }
  ).then(
    () => {
      return urlstore.listShortUrls(redisClient);
    }
  ).then(
    () => {
      redisClient.quit(function (err, res) {
        console.log('Exiting from quit command.');
      });
    }
  );
} catch (e) {
  console.log(e);
}