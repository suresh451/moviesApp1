import {Switch, Redirect, Route} from 'react-router-dom'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './components/Account'
import Search from './components/Search'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
