import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
//import * as firebase from 'firebase';
import { initializeApp } from "firebase/app";
// import { Auth0Provider } from "@auth0/auth0-react";

import "bootstrap/dist/css/bootstrap.min.css";

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
console.log(window.location.origin);
root.render(
  // <Auth0Provider
  //   domain="dev-n47evzlh.us.auth0.com"
  //   clientId="rvyYa5XzFYnj5UPWQu47GXyLLrP5K70h"
  //   redirectUri={window.location.origin + "/cocktails/tried"}
  // >
  <BrowserRouter basename="/cocktails">
    <App />
  </BrowserRouter>
  /* </Auth0Provider> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
