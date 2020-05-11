# express-auth

boilerplate for express and mongodb apps with REST api authentication

## Features

- [Node.JS](https://nodejs.org)
- [Express](https://github.com/expressjs/express)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://github.com/Automattic/mongoose)
- [JWT](https://jwt.io/)
- [Cookie-parser](https://github.com/expressjs/cookie-parser)
- [NodeMailer](https://github.com/nodemailer/nodemailer)
- [Joi](https://github.com/hapijs/joi)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Helmet](https://github.com/helmetjs/helmet)
- [Express-rate-limit](https://github.com/nfriedly/express-rate-limit)

## Usage

install dependencies

```
$ npm install
```

add .env file with the following variables

```
DB_CONNECT = # the address for your mongodb database
TOKEN_SECRET = # random secret for jwt token
SMTP_SERVER = # your smtp server address
EMAIL = # your email
PASSWORD = # your email password
```

run development server

```
$ npm run dev
```

## Note

As this project mainly features authentication, it includes a few security mesures:

- Hashing passwords with bcrypt
- Securing HTTP headers with helmet
- Validating user input with Joi
- Setting browser cookies as httpOnly
- Using JSON web token for authentication
- Preventing brute force attacks with express-rate-limit

**HOWEVER, THIS IS ONLY THE MINIMUM OF SECURITY, AND THIS CODE IS NOT MEANT FOR PRODUCTION**

**AS PRODUCTION APPS REQUIRE A LOT MORE SECURITY MESURES**

If you intend to use this code (or any code) in production, please consult a security expert.

You can also check [expressjs.com](https://expressjs.com/en/advanced/best-practice-security.html) for more security tips.
