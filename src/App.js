import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import auth from './services/authService';
import Movie from './components/movies/movie'
import NavBar from './components/navbar';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import Customers from './components/customer';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from './components/registerForm';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render () {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute  path="/movies/:id" component={MovieForm} /> 
            <Route path="/movies" 
              render={ props => <Movie {...props} user={this.state.user} />} />
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
}

export default App;
