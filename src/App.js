import React from 'react';
import { Switch, BrowserRouter, Route, Redirect} from "react-router-dom";
import './App.css';
import Header from "./container/Header/Header";
import Home from "./container/Home/Home";
import Favourite from "./container/Favourite/Favourite";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Header />
        <Switch>
          <Route path="/" render={() => <Redirect to="/beers/" />} exact/>
          <Route path={['/beers/', "/beers/:id"]} component={Home} exact/>
          <Route path={['/favourite/', "/favourite/:id"]} component={Favourite} exact />
          <Route render={() => <h2>Page Not Found...</h2>} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
