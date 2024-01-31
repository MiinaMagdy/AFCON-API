const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDoc, doc, getDocs, setDoc } = require('firebase/firestore');
const { isValidEmail } = require("../utils/validEmail");

const firebaseConfig = {
    apiKey: "AIzaSyCSo6AxOJ7abnieJD_RYu4cBqsFk1fXfJ4",
    authDomain: "afcon-f386a.firebaseapp.com",
    projectId: "afcon-f386a",
    storageBucket: "afcon-f386a.appspot.com",
    messagingSenderId: "906768748799",
    appId: "1:906768748799:web:2d2695e00e3d656fda7cca"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

exports.getAllPredictions = async (req, res) => {
    const predictionsSnap = await getDocs(collection(db, "predictions"));
    const predictions = []
    predictionsSnap.forEach((doc) => {
        predictions.push({ email: doc.id, ...doc.data() });
    });
    if (!predictions.length) {
        return res.status(404).json({
            status: 'fail',
            message: "There is no predictions"
        });
    }
    res.status(200).json({
        status: "success",
        data: {
            predictions
        }
    });
}

exports.getPredictionByEmail = async (req, res) => {
    if (!req.params.email || !isValidEmail(req.params.email)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid email"
        });
    }
    const userRef = doc(db, 'predictions', req.params.email);
    const predictionSnap = await getDoc(userRef);
    if (!predictionSnap.exists()) {
        return res.status(404).json({
            status: "fail",
            message: "This email dose NOT exist"
        });
    }
    res.status(200).json({
        status: "success",
        data: {
            prediction: predictionSnap.data()
        }
    });
}

exports.createPrediction = async (req, res) => {
    const { email, places, accuracy } = req.body;

    if (!email || !isValidEmail(email)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid email"
        });
    }

    if (!places || !places.quarter || places.quarter.length != 8 || !places.semi || places.semi.length != 4 || !places.final || places.final.length != 2 || !places.winner) {
        return res.status(400).json({
            status: "fail",
            message: "You must fill all places"
        });
    }

    const docRef = doc(db, 'predictions', email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return res.status(400).json({
            status: "fail",
            message: "This email already exists!"
        });
    }

    const newPrediction = {
        places,
        accuracy,
        timestamp: Date.now(),
    };

    await setDoc(doc(db, "predictions", email), newPrediction);

    res.status(201).json({
        status: 'success',
        data: {
            prediction: newPrediction
        },
    });
}