import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";
import {LoginStates, tokenDataStore} from "./stores/TokenDataStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const token = getParameterByName("token", null);
if (token!=null && token.length>0){
    //Store token and redirect to baseURL
    localStorage.setItem("token",token);
    tokenDataStore.state = LoginStates.LOGGED_IN
    tokenDataStore.token = token
}

root.render(
    <React.StrictMode>
        <HashRouter>
            <App/>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function getParameterByName(name: any, url: any) {
    if (!url) url = window.location.href;
    //name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}