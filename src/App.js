import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect}  from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import Header from './components/header/header.component';
import SigninSignup from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';
import { connect } from "react-redux";
import { setCurrentUser } from './redux/user/user.action';

class App extends Component
{
  
  unSubscribeFromAuth = null

  componentDidMount(){
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if(user)
      {
         const userRef = await createUserProfileDocument(user)

         userRef.onSnapshot(snapShot => {
            this.props.setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          }, () => console.log(this.state))
         })
      }
      else{
        this.props.setCurrentUser(user)
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
          <Header/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/shop" component={ShopPage}/>
            <Route exact path='/signin' render={() => this.props.currentUser?(<Redirect to="/" />):(<SigninSignup />)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
