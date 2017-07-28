const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const urlstore = require('./urlstore');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const router = express.Router();

const redisUrl = process.env.REDIS_URL || 'redis://redis:6379';

const redisClient = redis.createClient(redisUrl);

redisClient.on('error', (err) => {
  console.log(`error event - ${redisClient.host} : ${redisClient.port}  -  ${err}`); // eslint-disable-line no-console
});


// Middleware to use for all requests
router.use((req, res, next) => {
  console.log(`Request: ${req.path}`); // eslint-disable-line no-console
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // make sure we go to the next routes and don't stop here
});

// API Routes
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/api/test', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/api/shorten')
  .post((req, res) => {
    console.log(req.body);
    urlstore
      .addShortUrl(redisClient, req.body.shortName, req.body.url)
      .then(urlStruct => res.json({ message: 'URL Created', response: urlStruct }))
      .catch(e => res.status(500).send({ message: 'Error adding Url', error: e }));
  });

router.route('/api/list')
  .get((req, res) => {
    urlstore
      .listShortUrls(redisClient)
      .then(urlStructs => res.json({ message: 'URL List Recieved', urls: urlStructs }))
      .catch(e => res.status(500).send({ message: 'Error listing short urls', error: e }));
  });

router.route('/')
  .get((req, res) => {
    res.redirect('http://rexchange.com/');
  });

router.route('/:shortName')
  .get((req, res) => {
    const shortName = req.params.shortName;
    if (shortName === 'favicon.ico') {
      res.status(404).send('Not Found');
      return;
    }
    urlstore
      .getShortUrl(redisClient, shortName)
      .then(url => res.redirect(url))
      .catch(() => res.status(404).send('Not Found'));
  });


// REGISTER OUR ROUTES
app.use('/', router);

app.listen(port);
console.log(`Magic happens on port ${port}`); // eslint-disable-line no-console
