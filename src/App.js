import React from 'react';
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
    <BrowserRouter>
      <Navbar />
      <Header />
      <Switch>
        <Route path="/" render={() => <Redirect to="/beers/" />} exact />
        <Route path={['/beers/', '/beers/:id']} component={Home} exact />
        <Route path={['/favourite/', '/favourite/:id']} component={Favourite} exact />
        <Route path="/advanced_search" component={AdvancedSearch} exact />
        <Route path={['/founded_beers/', '/founded_beers/:id']} component={FoundedBeers} exact />
        <Route render={() => <h2 className="text-lg-center mt-4">Page Not Found...</h2>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
