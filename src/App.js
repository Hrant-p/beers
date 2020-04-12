import React, { Fragment } from 'react';
import {
  Switch, BrowserRouter, Route, Redirect,
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './container/Header/Header';
import Home from './container/Home/Home';
import Favourite from './container/Favourite/Favourite';
import Navbar from './container/Navbar/Navbar';
import AdvancedSearch from './container/AdvancedSearch/AdvancedSearch';
import FoundedBeers from './container/FoundedBeers/FoundedBeers';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Header />
        <Switch>
          <Redirect from="/" to="/beers/" exact />
          <Route path="/beers" component={Home} exact />
          <Route path="/beers/?:id" component={Home} exact />
          <Route path="/favourite" component={Favourite} exact />
          <Route path="/favourite/:id" component={Favourite} exact />
          <Route path="/advanced_search" component={AdvancedSearch} exact />
          <Route path="/founded_beers/" component={FoundedBeers} exact />
          <Route path="/founded_beers/:id" component={FoundedBeers} exact />
          <Route render={() => <h2 className="text-lg-center mt-4 mr-4">Page Not Found...</h2>} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
