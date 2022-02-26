import React from 'react';
import {BrowserRouter, Route, Switch}  from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import Header from './components/header/header.component';
import SigninSignup from './pages/sign-in-sign-up/sign-in-sign-up.component';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/shop" component={ShopPage}/>
          <Route exact path='/signin' component={SigninSignup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
