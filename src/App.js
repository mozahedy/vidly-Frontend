import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movie from './components/movies/movie'
import NavBar from './components/navbar';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import Customers from './components/customer';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movie} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Redirect path="/" to="/movies" exact /> 
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
