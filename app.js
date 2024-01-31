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

// Routers
app.use('/api/v1/predictions', predictionRouter);

// Launch Express server
const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});