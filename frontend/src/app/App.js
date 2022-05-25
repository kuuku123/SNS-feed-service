import React, { Component ,useState ,useEffect} from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { JWT } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

function App() {
 const [state,setState]= useState({
      authenticated: false,
      currentUser: null,
      loading: true
    }
)


  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
    .then(response => {
      console.log(response)
      setState({
        currentUser: response,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      console.log(error)
      setState({
        loading: false
      });  
    });    
  }

  const handleLogout = () => {
    localStorage.removeItem(JWT);
    setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

useEffect(() => {
  console.log("com did mount")
  loadCurrentlyLoggedInUser();
},[])


    if(state.loading) {
      return <LoadingIndicator />
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={state.authenticated} onLogout={handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home}></Route>           
            <PrivateRoute path="/profile" authenticated={state.authenticated} currentUser={state.currentUser}
              component={Profile}></PrivateRoute>
            <Route path="/login"
              render={(props) => <Login authenticated={state.authenticated} loadCurrentlyLoggedInUser={loadCurrentlyLoggedInUser} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }

export default App;
