<br />
<p align="center">
  <h3 align="center">Passport Authentication</h3>

  <p align="center">
    Authentication system using <strong>Passport</strong> built with a clean architecture approach. Built for re-use over a multitude of projects, un-tied to a specific framework and database. 
    <br/>
    <br />
    <div align="center">
      <img width="60px" height="60px" src="https://res.cloudinary.com/dxqmbhsis/image/upload/v1631840281/passport-white_tb1epr.png"/>
    </div>
    <br />
    <div align="center">
      <a target="_blank" rel="noopener noreferrer" href="https://main.d8ottqgcqlwb0.amplifyapp.com/">Live Demo</a>
    </div>
  </p>
</p>

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
   
3. Run Tests ( Optional ) 🔬
   ```sh
   npm run test
   ```
   or
   ```sh
   yarn test
   ```
   
4. Start the live server 🎉🎉
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```
