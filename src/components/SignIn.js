import React, { Component } from 'reactn';
import { Container, Button } from 'semantic-ui-react';
import { handleSignIn } from '../helpers/authentication';

class SignIn extends Component {
  render() {
    return (
      <Container className="margin-top-300">
        <div className="center">
          <h1>Welcome to Kid Coin</h1>
          <p>Whether your child is just learning about money and allowances or if they are dipping their toes into savings and investing, Kid Coin is for you.</p>
          <p>Let's get started!</p>
          <Button className='btn button-primary' onClick={handleSignIn}>Sign In</Button>
        </div>
      </Container>
    );
  }
}

export default SignIn;
