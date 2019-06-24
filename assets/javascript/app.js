//Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCvOhlkfaB89T8oO2b8BVDPnW8VsXuTrN8",
  authDomain: "train-scheduler-2ce70.firebaseapp.com",
  databaseURL: "https://train-scheduler-2ce70.firebaseio.com",
  projectId: "train-scheduler-2ce70",
  storageBucket: "",
  messagingSenderId: "181245977711",
  appId: "1:181245977711:web:bb5ba920330f9194"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Variable to reference the database

var database = firebase.database();
