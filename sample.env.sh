# google client id and secret.  Used to accept Google auth for users 
export GOOGLE_CLIENT_ID="example.apps.googleusercontent.com"
export GOOGLE_CLIENT_SECRET="123456"

# jwt signing key by our API server
export JWT_SIGNING_KEY="my-jwt-key"

# Authorized users (email addresses)
export USERS="joe@blogs.com"

# Server name.  Used in nginx config; important
# for SSL/HTTPS setup
export SERVER_NAME="server.example.org"
