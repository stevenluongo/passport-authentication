module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    USERS_COLLECTION_NAME: process.env.USERS_COLLECTION_NAME,
    VERIFICATION_COLLECTION_NAME: process.env.VERIFICATION_COLLECTION_NAME,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    PROD_URL: process.env.PROD_URL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },
};

/*
ENVIRONMENT VARIABLE CONFIGURATION

* add a .env.local file into your main directory *

GITHUB ENVIRONMENT VARIABLES ( REQUIRED )
- MONGODB_URI : *required* generated at https://www.mongodb.com/. Spin up a new cluster insert the generated URI
- DB_NAME :  *required* name of the database from mongodb
- TOKEN_SECRET :  *required* key used to serialize & deserialize session cookies. Generate a 512-bit key - https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
- USERS_COLLECTION_NAME : *required* name of the users collection. You can name it whatever you want.
- VERIFICATION_COLLECTION_NAME : *required* name of the verification collection. You can name it whatever you want.
- SENDGRID_API_KEY : *required* generate an api key on sendgrid for email verification

GITHUB ENVIRONMENT VARIABLES ( OPTIONAL )
READ THIS - https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
- GITHUB_CLIENT_ID : You need to generate this.
- GITHUB_CLIENT_SECRET : You need to generate this.
- GITHUB_CALLBACK_URL : http://localhost:3000/api/auth/github/callback

PRODUCTION ENVIRONMENT VARIABLES ( OPTIONAL )
- PROD_URL : This is only for hosting. You don't need to touch this unless you want to deploy the project somewhere. Example would be https://helloworld.com


FOR TESTING
* add a .env.test.local file into your main directory *

Jest will read from this file to populate env variables during tests
All you need to do is copy the contents of .env.local into here


Happy coding.
*/
