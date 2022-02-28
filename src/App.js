import React, { Component } from 'react';
import {BrowserRouter, Route, Switch}  from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import Header from './components/header/header.component';
import SigninSignup from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

class App extends Component
{
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }
  
  unSubscribeFromAuth = null

  componentDidMount(){
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if(user)
      {
         const userRef = await createUserProfileDocument(user)

         userRef.onSnapshot(snapShot => {
            this.setState({currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => console.log(this.state))
         })
      }
      else{
        this.setState({currentUser: user})
      }
    })
  }

  componentWillUnmount(){
      this.unSubscribeFromAuth();
  }

  render(){
    return (
      <BrowserRouter >
        <div>
          <Header currentUser={this.state.currentUser}/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/shop" component={ShopPage}/>
            <Route exact path='/signin' component={SigninSignup} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
