import React from "react";
import { Switch, Route } from "react-router-dom";
import SongList from "./SongList";
import SongCreate from "./SongCreate";

const App = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact component={SongList} path="/" />
        <Route exact component={SongCreate} path="/create" />
      </Switch>
    </div>
  );
};

export default App;
