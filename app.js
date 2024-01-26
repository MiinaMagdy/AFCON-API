// import built-in node js

// import third-party 
const express = require('express');

// import local files
const predictionRouter = require('./routers/predictionRoutes');

// express instance
const app = express();

// Middlewares
app.use(express.json());

// Routers
app.use('/api/v1/predictions', predictionRouter);

// Launch Express server
const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});