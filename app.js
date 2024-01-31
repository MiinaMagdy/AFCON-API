// import built-in node js

// import third-party 
const express = require('express');
const cors = require("cors")

// import local files
const predictionRouter = require('./routers/predictionRoutes');

// express instance
const app = express();

// Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'https://predict-afcon.netlify.app']
}));
// app.use(function (req, res, next) {
//     // res.header("Access-Control-Allow-Origin", "*");
//     const allowedOrigins = ['http://localhost:5173'];
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         console.log("allowedOrigins included origin", origin)
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
//     next();
// });
app.use(express.json());

// Routers
app.use('/api/v1/predictions', predictionRouter);

// Launch Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

    console.log(`Listening to port ${PORT}`);
});