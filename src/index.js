import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setGlobal } from 'reactn';
import { UserSession } from 'blockstack';
import { appConfig } from './config';
import 'semantic-ui-css/semantic.min.css';
const userSession = new UserSession({ appConfig })
const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';;

setGlobal({
    userSession, 
    person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
    },
    transactions: [], 
    balance: 0.00, 
    transactionModalOpen: false
})


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
