import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const config = {
    firebase_dev: {
        apiKey: "apiKey",
        authDomain: "studienprojekt-ss22.firebaseapp.com",
        projectId: "studienprojekt-ss22",
        storageBucket: "studienprojekt-ss22.appspot.com",
        messagingSenderId: "761712705986",
        appId: "1:761712705986:web:5bdafd18dc884cab1d965b",
        measurementId: "G-WDRLJ64SFM"
    }
};

const app = initializeApp(config.firebase_dev)
export const db = getFirestore(app)

export function getCurrentUser() {
    return getAuth().currentUser
}
