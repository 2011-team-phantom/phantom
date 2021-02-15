# Plutus

Plutus is a progressive web app that allows users to create a budget and visualize their spending by connecting a bank account.

Live App: https://phantombudget.herokuapp.com/

### Built With

- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Sign up with Plaid API [here](https://dashboard.plaid.com/signup) to get a Client ID and Secret.

### Installation

You can run this app in two modes: sandbox or development, based on the API key you have. Use sandbox to connect a test bank account and use development to connect a real bank account.

1. Clone the repo.
   ```bash
   git clone https://github.com/2011-team-phantom/phantom.git
   ```
2. Install NPM packages.

   ```bash
   npm install
   ```

3. Create a new database in MongoDB called phantomdb.

   ```
   mongo
   use phantomdb
   ```

4. For both sandbox and development mode, create a .env file with your Plaid Client ID, Plaid Secret, and Session Secret.

   ```
   PLAID_CLIENT_ID=YOUR_CLIENT_ID_FROM_PLAID
   PLAID_SECRET=YOUR_SECRET_FROM_PLAID
   SESSION_SECRET='YOUR OWN SECRET'
   ```

   For development mode, also change your Client env in `/server/api/index.js`.

   ```javascript
   const client = new plaid.Client({
     clientID: process.env.PLAID_CLIENT_ID,
     secret: process.env.PLAID_SECRET,
     env: plaid.environments.development,
   });
   ```

5. Start server and run locally.
   ```bash
   npm run start-dev
   ```
6. You can now interact with Plutus app on http://localhost:3000/.

## Team

Teofilo Callañaupa - [LinkedIn](https://www.linkedin.com/in/teofilocallanaupa/) | [Github](https://github.com/TeofiloCallanaupa)\
Comfort Olowo - [LinkedIn](https://www.linkedin.com/in/comfort-o/) | [Github](https://github.com/colowo12)\
Janet Lam - [LinkedIn](https://www.linkedin.com/in/janetlam3933/) | [Github](https://github.com/janet-lam)\
Kaitlin Browne - [LinkedIn](https://www.linkedin.com/in/kaitlin-browne/) | [Github](https://github.com/kaitbr0)

## Other Techs Used

- [Plaid API](https://plaid.com/)
- [Chart.js](https://www.chartjs.org/)
- [Semantic UI](https://semantic-ui.com/)
- [Lottie](https://lottiefiles.com/)
- [date-fns](https://date-fns.org/)
- [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs)
- [email-validator](https://www.npmjs.com/package/email-validator)
