import React, { Component } from 'reactn';
import { BrowserRouter, Route } from 'react-router-dom';
import { setGlobal } from 'reactn';
import './App.css';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Skeleton from './components/Skeleton';
import { loadTransactions } from './helpers/transactions';
const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

class App extends Component {
  componentDidMount() {
    const { userSession } = this.global;
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(() => {
        window.location = window.location.origin;
      });
    } else {
      if(userSession.isUserSignedIn()) {
        setGlobal({
          person: {
            name() {
              return userSession.loadUserData().username;
            },
            avatarUrl() {
              return userSession.loadUserData().profile.image[0] ? userSession.loadUserData().profile.image[0].contentUrl : avatarFallbackImage
            },
        },
        })
      }
      loadTransactions();
    }
  }
  render() {
    const { userSession } = this.global;
    return (
      <div>
        {
          window.location.href.includes('auth') ?
          <Skeleton /> : 
          userSession.isUserSignedIn() ? 
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Home} />
            </div>
          </BrowserRouter> : 
          <SignIn />
        }
      </div>
    );
  }
}

export default App;
