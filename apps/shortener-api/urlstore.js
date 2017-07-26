const SHORT_NAME_PREFIX = 'hummingbird:shortener:';

function generateShortNameHash(shortName) {
  return SHORT_NAME_PREFIX + shortName;
}

function getShortNameStruct(redisClient, shortNameHash) {
  return new Promise((resolve, reject) => {
    redisClient.hgetall(shortNameHash, (err, response) => {
      if (err || !response) {
        reject(err || 'No key found.');
      } else {
        resolve(response);
      }
    });
  });
}

function setShortNameStruct(redisClient, shortNameHash, shortName, url) {
  return new Promise((resolve, reject) => {
    redisClient.hmset(shortNameHash, 'shortName', shortName, 'url', url, 'hits', 0, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

function updateShortNameStructHit(redisClient, shortNameHash) {
  return new Promise((resolve, reject) => {
    redisClient.hincrby(shortNameHash, 'hits', 1, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

function listShortNameHashes(redisClient) {
  return new Promise((resolve, reject) => {
    redisClient.keys(`${SHORT_NAME_PREFIX}*`, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

async function addShortUrl(redisClient, shortName, url) {
  try {
    const shortNameHash = generateShortNameHash(shortName);
    const shortNameStruct = await getShortNameStruct(redisClient, shortNameHash);
    if (shortNameStruct == null) {
      return await setShortNameStruct(redisClient, shortNameHash, shortName, url);
    }
    return null;
  } catch (e) {
    throw e;
  }
}

async function getShortUrl(redisClient, shortName) {
  try {
    const shortNameHash = generateShortNameHash(shortName);
    const shortNameStruct = await getShortNameStruct(redisClient, shortNameHash);
    await updateShortNameStructHit(redisClient, shortNameHash);
    return shortNameStruct.url;
  } catch (e) {
    throw e;
  }
}

async function listShortUrls(redisClient) {
  try {
    const keys = await listShortNameHashes(redisClient);
    const urlStructs = await Promise.all(keys.map(
      key => getShortNameStruct(redisClient, key),
    ));
    return urlStructs;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  getShortUrl,
  addShortUrl,
  listShortUrls,
};
