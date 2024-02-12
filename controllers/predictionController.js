const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    getDoc,
    doc,
    getDocs,
    setDoc,
} = require('firebase/firestore');

const { isValidEmail } = require('../utils/validEmail');
const { calcAccuracy } = require('../utils/calcAccuracy');

const firebaseConfig = {
    apiKey: 'AIzaSyCSo6AxOJ7abnieJD_RYu4cBqsFk1fXfJ4',
    authDomain: 'afcon-f386a.firebaseapp.com',
    projectId: 'afcon-f386a',
    storageBucket: 'afcon-f386a.appspot.com',
    messagingSenderId: '906768748799',
    appId: '1:906768748799:web:2d2695e00e3d656fda7cca',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

exports.getAllPredictions = async (req, res) => {
    const predictionsSnap = await getDocs(collection(db, 'predictions'));
    const predictions = [];
    for (let doc of predictionsSnap.docs) {
        let { accuracy, places } = doc.data();
        if (accuracy === null) {
            accuracy = calcAccuracy(places);
            await setDoc(doc.ref, {
                ...doc.data(),
                accuracy,
            });
        }
        predictions.push({ email: doc.id, ...doc.data(), accuracy });
    }
    if (!predictions.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'There is no predictions',
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            predictions,
        },
    });
};

exports.getPredictionByEmail = async (req, res) => {
    const email = req.params.email;
    if (!email || !isValidEmail(email)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid email',
        });
    }
    const userRef = doc(db, 'predictions', email);
    const predictionSnap = await getDoc(userRef);
    if (!predictionSnap.exists()) {
        return res.status(404).json({
            status: 'fail',
            message: 'This username dose NOT exist',
        });
    }

    let { accuracy, places } = predictionSnap.data();
    if (accuracy === null) {
        accuracy = calcAccuracy(places);
        await setDoc(userRef, {
            ...predictionSnap.data(),
            accuracy,
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            prediction: {
                ...predictionSnap.data(),
                accuracy,
            },
        },
    });
};

exports.createPrediction = async (req, res) => {
    let { user, places, accuracy } = req.body;

    if (!user || typeof user != 'object') {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid user',
        });
    }

    const { username, email } = user;

    if (!username) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid username',
        });
    }
    if (!email || !isValidEmail(email)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid email',
        });
    }

    if (!places) {
        return res.status(400).json({
            status: 'fail',
            message: 'No places are given',
        });
    }

    const docRef = doc(db, 'predictions', email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return res.status(400).json({
            status: 'fail',
            message: 'This email already exists!',
        });
    }

    accuracy = null;

    const newPrediction = {
        username,
        places,
        accuracy,
        timestamp: Date.now(),
    };

    await setDoc(doc(db, 'predictions', email), newPrediction);

    res.status(201).json({
        status: 'success',
        data: {
            prediction: newPrediction,
        },
    });
};
