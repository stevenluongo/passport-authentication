//DEV

module.exports = {
  reactStrictMode: true,
  env: {
    "MONGODB_URI": "mongodb+srv://admin:eq6USAZD17e3@cluster0.pakjj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "TOKEN_SECRET": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzMTQ2NzQ4OCwiaWF0IjoxNjMxNDY3NDg4fQ.dK6oxCBcbSZRUKctB8Kjumm7-W2YrFkE0QF0WVtvTmM",
    "GITHUB_CLIENT_ID": "da1368c1a4fb4e9be4ae",
    "GITHUB_CLIENT_SECRET": "1ba06271db463100dea70645f0b06c6652338600",
    "GITHUB_CALLBACK_URL": "http://localhost:3000/api/auth/github/callback",
    "SENDGRID_API_KEY": "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",
  }
}

//PROD

// module.exports = {
//   reactStrictMode: true,
//   env: {
//     // "MONGODB_URI": "mongodb+srv://admin:eq6USAZD17e3@cluster0.pakjj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     // "TOKEN_SECRET": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzMTQ2NzQ4OCwiaWF0IjoxNjMxNDY3NDg4fQ.dK6oxCBcbSZRUKctB8Kjumm7-W2YrFkE0QF0WVtvTmM",
//     // "GITHUB_CLIENT_ID": "9e2c12e4c82dddd698a3",
//     // "GITHUB_CLIENT_SECRET": "b51791989ae67c85744dd1325c11d614c0c0c2d8",
//     // "GITHUB_CALLBACK_URL": "https://test-build.d8ottqgcqlwb0.amplifyapp.com/api/auth/github/callback",
//     'MONGODB_URI': process.env.MONGODB_URI,
//     'TOKEN_SECRET': process.env.TOKEN_SECRET,
//     'GITHUB_CLIENT_ID': process.env.GITHUB_CLIENT_ID,
//     'GITHUB_CLIENT_SECRET': process.env.GITHUB_CLIENT_SECRET,
//     'GITHUB_CALLBACK_URL': process.env.GITHUB_CALLBACK_URL,
//   }
// }