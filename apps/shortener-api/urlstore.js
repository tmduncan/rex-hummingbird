'use strict';

const SHORT_NAME_PREFIX = "hummingbird:shortener:";

function generateShortNameHash(shortName) {
  return SHORT_NAME_PREFIX + shortName;
}

function getShortNameStruct(redisClient, shortNameHash) {
  return new Promise(function (resolve, reject) {
    redisClient.hgetall(shortNameHash, function (err, response) {
      if (err || !response) {
        reject(err || "No key found.");
      } else {
        resolve(response);
      }
    })
  });
}

function setShortNameStruct(redisClient, shortNameHash, shortName, url) {
  return new Promise(function (resolve, reject) {
    redisClient.hmset(shortNameHash, "shortName", shortName, "url", url, "hits", 0, function (err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

function updateShortNameStructHit(redisClient, shortNameHash) {
  return new Promise(function (resolve, reject) {
    redisClient.hincrby(shortNameHash, 'hits', 1, function (err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

function listShortNameHashes(redisClient) {
  return new Promise(function (resolve, reject) {
    redisClient.keys(SHORT_NAME_PREFIX + "*", function (err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    })
  });
}

async function addShortUrl(redisClient, shortName, url) {
  try {
    const shortNameHash = generateShortNameHash(shortName);
    const shortNameStruct = await getShortNameStruct(redisClient, shortNameHash);
    console.log(`getShortNameStruct returned: ${shortNameStruct}`);
    if (shortNameStruct == null) {
      console.log(`adding ${shortName}:${url}`);
      return await setShortNameStruct(redisClient, shortNameHash, shortName, url);
    } else {
      console.log(`${shortName} already defined`);
      return null;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getShortUrl(redisClient, shortName) {
  try {
    const shortNameHash = generateShortNameHash(shortName);
    const shortNameStruct = await getShortNameStruct(redisClient, shortNameHash);
    await updateShortNameStructHit(redisClient, shortNameHash);
    return shortNameStruct['url']
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function listShortUrls(redisClient) {
  try {
    const keys = await listShortNameHashes(redisClient);
    keys.forEach((key) => {
      console.log(key);
    });
    const urlStructs = await Promise.all(keys.map(
      (key) => getShortNameStruct(redisClient, key)
    ));
    urlStructs.forEach((entry) => console.log(entry));
    return urlStructs;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = {
  getShortUrl: getShortUrl,
  addShortUrl: addShortUrl,
  listShortUrls: listShortUrls,
};

