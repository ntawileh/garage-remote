const express = require('express');
const redis = require('redis');
const requireAuth = require('../middlewares/requireAuth');
const config = require('../config');

const router = express.Router();
router.use(requireAuth);

const redisConnection = redis.createClient({
  host: config.redis.host,
  port: config.redis.port
});

redisConnection.on('connect', function() {
  console.log('Connected to Redis');
});

redisConnection.on('error', function(err) {
  console.log('Redis error: ' + err);
});

var publishRedis = function(res, topic, message) {
  try {
    if (redisConnection.publish(topic, message)) {
      res.send({ publish: 'success' });
    } else {
      res.status(501).send({ error: 'unable to publish command' });
    }
  } catch (err) {
    res.status(501).send({ error: 'unable to trigger remote' });
  }
};

router.post('/garage/door', (req, res) => {
  console.log('publishing relay command to redis');
  publishRedis(res, config.redis.topic, config.redis.relayMessage);
});

module.exports = router;
