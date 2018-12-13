import React, { Component } from 'react';
import {Jumbotron} from 'reactstrap';
import HeaderNavigation from './components/HeaderNavigation'
import About from './components/About'
import ConnectedSearch from './components/Search'

import './index.css';

class App extends Component {

    render() {

        return (
           <div className='App'>
              <HeaderNavigation />
              <About />
              <ConnectedSearch/>
            </div>
        );
    }
}

export default App;

