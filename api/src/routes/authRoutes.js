const express = require('express');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');

const config = require('../config');

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  config.google.client_id,
  config.google.client_secret,
  ''
);

router.post('/signin', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(422).send({ error: 'missing information in signup' });
  }

  try {
    const ticket = await oauth2Client.verifyIdTokenAsync({
      idToken: idToken,
      audience: config.google.client_id
    });

    const payload = ticket.getPayload();

    const isAuthorized = config.auth.whitelistedUsers.findIndex(
      item => payload['email'].toLowerCase() === item.toLowerCase()
    );

    if (isAuthorized === -1) {
      console.log('unauthorized sign in from email ', payload['email']);
      throw 'Not authorized';
    }

    console.log('sign in from', payload['email']);
    const tokenContent = {
      userId: payload['sub'],
      domain: payload['hd'],
      email: payload['email']
    };

    const token = jwt.sign(tokenContent, config.auth.jwtKey, {
      expiresIn: '2h'
    });
    res.send({ token });
  } catch (error) {
    console.log('sign in error', error);
    res.status(400).send('sign in error');
  }
});

module.exports = router;
