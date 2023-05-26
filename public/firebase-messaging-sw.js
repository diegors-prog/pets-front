importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAff9hKo9F-Ubv3q520aqLk-kokUa2mPWw",
    authDomain: "petfinder360-28fd1.firebaseapp.com",
    projectId: "petfinder360-28fd1",
    storageBucket: "petfinder360-28fd1.appspot.com",
    messagingSenderId: "449763451713",
    appId: "1:449763451713:web:e4b8e4e28755aca3bef7c0",
    measurementId: "G-FQV7TFML64"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
})