import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
//import * as firebase from 'firebase';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA8DLy1n5YJZuTDXfQMWwzo6hkQiuPJcLM",
  authDomain: "cocktails-aec8a.firebaseapp.com",
  databaseURL:
    "https://cocktails-aec8a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cocktails-aec8a",
  storageBucket: "cocktails-aec8a.appspot.com",
  messagingSenderId: "155652064704",
  appId: "1:155652064704:web:55ebf042fbe4de8eb63425",
  measurementId: "G-GS6JQQLRM5",
};
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/cocktails">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
