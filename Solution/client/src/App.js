import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useSelector } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';
import PostDetails from './components/Posts/Post/PostDetails/PostDetails';
import Search from './components/Search/Search';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';
import EditUser from './components/ProfileDetails/EditUser.js/EditUser';

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {

  const GOOGLE_ID = process.env.REACT_APP_GOOGLE_ID;

  const user = useSelector((state) => state.auth.user);

  return (
    <GoogleOAuthProvider clientId={`${GOOGLE_ID}`}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Navbar />
            <Switch>
              <Route path="/" exact component={() => <Redirect to="/posts" />} />
              <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
              <Route path="/posts" exact component={Home} />
              <Route path="/posts/search" exact component={Search} />
              <Route path="/posts/new" component={() => (user ? <Form /> : <Redirect to="/posts" />)} />
              <Route path="/posts/:id" exact component={PostDetails} />
              <Route path="/posts/:id/edit" component={() => (user ? <Form /> : <Redirect to="/posts" />)} />
              <Route path="/users/:id" exact component={ProfileDetails} />
              <Route path="/users/:id/posts" exact component={ProfileDetails} />
              <Route path="/users/:id/edit" exact component={() => (user ? <EditUser /> : <Redirect to="/posts" />)} />
            </Switch>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider >
  )
}

export default App;
