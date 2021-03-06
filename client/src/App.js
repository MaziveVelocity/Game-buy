import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import {
  InMemoryCache
} from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMedia } from "@artsy/fresnel";
import ApolloClient from 'apollo-boost';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Login from './pages/Login';
import Sell from './pages/Sell';
import Cart from './pages/Cart';
import { Provider } from 'react-redux';
import store from './utils/store';
import signUp from './pages/Signup';

// sets up apollo server for application 
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// creates media break points for application
const AppMedia = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920
  }
});

// sets up break points for app to use
const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

// returns app componet
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <style>{mediaStyles}</style>
          <MediaContextProvider>
            <Navbar Media={Media}> 
              <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/sell' component={Sell} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/register' component={signUp} />
                <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
              </Switch>
            </Navbar>
          </MediaContextProvider>
        </Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
