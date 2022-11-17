<br />
<p align="center">
  <h1 align="center">Passport Authentication</h1>
  <p align="center">
    Authentication system using <a href="https://www.passportjs.org/">Passport.js</a> built with a clean architecture approach. <br/>Built for re-use over a multitude of projects, 
un-tied to a specific framework and database.
  </p>
  <br/>
</p>

![Untitled (1)](https://user-images.githubusercontent.com/53283472/202077470-32e7d631-b444-47c7-b822-ccf4bba6cb20.gif)

<br/>

## About This Project

### Built With

- [passport-local](https://www.npmjs.com/package/passport-local) | Local Autentication Provider
- [passport-github](https://www.npmjs.com/package/passport-github) | GitHub Autentication Provider
- [@hapi/iron](https://www.npmjs.com/package/@hapi/iron) | Session Serialization / Deserialization
- [Jest](https://jestjs.io/) | Testing Framework
- [Next.js](https://nextjs.org/) | Front-end Framework
- [MongoDB](https://www.mongodb.com/) | Database

### Hosted With

- [AWS Amplify](https://aws.amazon.com/amplify/)

## Local Installation

1. Clone the repo ✅
   ```sh
   git clone https://github.com/stevenluongo/passport-authentication.git
   ```
2. Install dependencies 🔨
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
3. Configure Environment Variables 📁
   ```sh
   touch .env.local
   ```
   ```sh
   touch .env.test.local
   ```
   View next.config.js for further instructions
4. Run Tests ( Optional ) 🔬
   ```sh
   npm run test
   ```
   or
   ```sh
   yarn test
   ```
5. Start the live server 🎉🎉
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```
