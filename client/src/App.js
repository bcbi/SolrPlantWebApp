import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HeaderNavigation from './components/HeaderNavigation'
import About from './components/About'
import ConnectedSearch from './components/Search'

class App extends Component {
  render() {
    console.log("Public URL");
    console.log(`${process.env.PUBLIC_URL}`);
    return (
      <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
        <div className="App">
          <div className="topContent">
            <HeaderNavigation />
            <div className="main-content">
              <Route path="/about" component={About} />
              <Route exact path="/" component={ConnectedSearch} />
            </div>
          </div>
          <footer className="text-muted"><small> © 2018 Brown Center for Biomedical Informatics, Brown University </small></footer>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;

