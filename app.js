// import built-in node js

// import third-party 
const express = require('express');
const cors = require("cors")

// import local files
const predictionRouter = require('./routers/predictionRoutes');

// express instance
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// Routers
app.use('/api/v1/predictions', predictionRouter);

// Launch Express server
const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});