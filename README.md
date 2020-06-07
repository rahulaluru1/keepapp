This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install npm
Make sure your local development environment has npm installed. This also needs node. You can use Node installer which will automatically install npm.

### npm install
run 'npm install' at the app level of the directory to install dependencies for the front-end and run 'npm install' at the backend level of the directory to install the dependencies for the backend. You can individually install each or do a batch install from your command line by looking for dependencies in both package.json files.

## Set-up your MongoDB account
In this application I used MongoDB atlas cloud for storing data. You can create a .env file at backend level of the directory and place your appication connection uri in there. Name it 'ATLAS_URI' so that you don't need t change anything in server.js file.

Now that you're all set-up just open two command line prompts one at the App level and one at the backend level of the directory and run 'npm start' and 'nodemon server' respectively.