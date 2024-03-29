// import built-in node js

// import third-party
const express = require('express');
const cors = require('cors');

// import local files
const predictionRouter = require('./routers/predictionRoutes');

// express instance
const app = express();

// Middlewares
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://predict-afcon.netlify.app'],
    })
);
app.use(express.json());

// Routers
app.use('/api/v1/predictions', predictionRouter);

// Launch Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
