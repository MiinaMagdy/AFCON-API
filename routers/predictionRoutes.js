// import third-party
const express = require('express');
// import local files
const predictionController = require('./../controllers/predictionController')

const router = express.Router();

router.route('/')
    .get(predictionController.getAllPredictions)
    .post(predictionController.createPrediction);

router.get('/:email', predictionController.getPredictionByEmail);

module.exports = router;