// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBA_h2OI3SHsU0j5ohQNH-tJ7AnD2mDhWQ',
	authDomain: 'webrtc-chat-app-8fea5.firebaseapp.com',
	projectId: 'webrtc-chat-app-8fea5',
	storageBucket: 'webrtc-chat-app-8fea5.appspot.com',
	messagingSenderId: '535784517531',
	appId: '1:535784517531:web:371f9a752d48098348bb3e',
	measurementId: 'G-ZX4KM5CER2'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
