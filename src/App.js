import React from 'react';
import { Switch, BrowserRouter, Route} from "react-router-dom";
import './App.css';
import Header from "./container/Header/Header";
import Home from "./container/Home/Home";
import Favourite from "./container/Favourite/Favourite";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar/>
        <Header />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/favourite' component={Favourite} exact />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
