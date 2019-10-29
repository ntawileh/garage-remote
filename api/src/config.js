module.exports = {
  app: {
    port: parseInt(process.env.SERVER_PORT) || 5000
  },
  auth: {
    /**
     * Maximum token age in order to be valid
     * @type string
     */
    maxAge: '2h',
    jwtKey: process.env.JWT_SIGNING_KEY,
    whitelistedUsers: process.env.USERS ? process.env.USERS.split(/\s+/) : []
  },
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    topic: 'gpiod',
    relayMessage: 'relay'
  }
};
