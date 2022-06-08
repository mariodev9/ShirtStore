import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDT2Jyaw7XcFrNZ6874fG7AYbSEqxAyT_E",
  authDomain: "shirtstore-2c137.firebaseapp.com",
  projectId: "shirtstore-2c137",
  storageBucket: "shirtstore-2c137.appspot.com",
  messagingSenderId: "981921692457",
  appId: "1:981921692457:web:0e1dc2ee6569fbebbe9538",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
