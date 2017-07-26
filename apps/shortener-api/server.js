const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const router = express.Router();

const redisUrl = process.env.REDIS_URL || "redis://redis:6379";

const redis = require("redis"),
  redisClient = redis.createClient(redisUrl);

redisClient.on('error', function (err) {
  console.log('error event - ' + client.host + ':' + client.port + ' - ' + err);
});

const urlstore = require('./urlstore');

// Middleware to use for all requests
router.use(function (req, res, next) {
  console.log(`Request: ${req.path}`);
  next(); // make sure we go to the next routes and don't stop here
});

// API Routes
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/api/test', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

router.route('/api/shorten')
  .post(function (req, res) {
    console.log(req.body.url);
    console.log(req.body.shortName);
    urlstore
      .addShortUrl(redisClient, req.body.shortName, req.body.url)
      .then((urlStruct) => res.json({message: "URL Created"}))
      .catch((e) => res.status(500).send({message: "Error adding Url", error: e}));
  });

router.route('/api/list')
  .get(function (req, res) {
    urlstore
      .listShortUrls(redisClient)
      .then((urlStructs) => res.json({message: "URL List Recieved", urls: urlStructs}))
      .catch((e) => res.status(500).send({message: "Error listing short urls", error: e}));
  });

router.route('/')
  .get(function (req, res) {
    res.redirect("http://rexchange.com/")
  });

router.route('/:shortName')
  .get(function (req, res) {
    const shortName = req.params.shortName;
    if (shortName === 'favicon.ico') {
      res.status(404).send('Not Found');
      return;
    }
    urlstore
      .getShortUrl(redisClient, shortName)
      .then((url) => res.redirect(url))
      .catch(() => res.status(404).send('Not Found'));
  });


// REGISTER OUR ROUTES
app.use('/', router);

app.listen(port);
console.log('Magic happens on port ' + port);