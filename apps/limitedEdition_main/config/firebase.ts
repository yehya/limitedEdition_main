import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfigs = {
  production: {
    apiKey: "AIzaSyC_U5QPw9QLFfbJFfdMmMtGJ_AbvoX13tQ",
    authDomain: "limited-edition-prod.firebaseapp.com",
    projectId: "limited-edition-prod",
    storageBucket: "limited-edition-prod.firebasestorage.app",
    messagingSenderId: "313942451307",
    appId: "1:313942451307:web:3860bc4ac990d3d8e97d2e",
    measurementId: "G-KTMWL710KX",
  },
  development: {
    apiKey: "AIzaSyC_U5QPw9QLFfbJFfdMmMtGJ_AbvoX13tQ",
    authDomain: "limited-edition-prod.firebaseapp.com",
    projectId: "limited-edition-prod",
    storageBucket: "limited-edition-prod.firebasestorage.app",
    messagingSenderId: "313942451307",
    appId: "1:313942451307:web:3860bc4ac990d3d8e97d2e",
    measurementId: "G-KTMWL710KX",
  },
  testing: {
    apiKey: "AIzaSyC_U5QPw9QLFfbJFfdMmMtGJ_AbvoX13tQ",
    authDomain: "limited-edition-prod.firebaseapp.com",
    projectId: "limited-edition-prod",
    storageBucket: "limited-edition-prod.firebasestorage.app",
    messagingSenderId: "313942451307",
    appId: "1:313942451307:web:3860bc4ac990d3d8e97d2e",
    measurementId: "G-KTMWL710KX",
  },
};

const env = process.env.EXPO_PUBLIC_FIREBASE_ENV || 'development';
const firebaseConfig = firebaseConfigs[env as keyof typeof firebaseConfigs] || firebaseConfigs.development;

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics, firebaseConfig };
