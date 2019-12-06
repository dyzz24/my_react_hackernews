import React from 'react';
import './App.css';
import Hackernews from './hackernews/hackernews';

import { Switch, Route } from "react-router-dom";
import { Userinfo } from './userinfo/userinfo';



function App() {
  return (
    <div className="App">
      <Hackernews></Hackernews>

      <Switch>
      <Route path = '/user/:id' component = {Userinfo}/>
      </Switch>
    </div>
  );


}

export default App;
