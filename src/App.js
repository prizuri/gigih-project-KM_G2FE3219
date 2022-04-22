import './App.css';
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import UserAuth from './components/Auth/UserAuth';
import CreatePlaylist from './components/CreatePlaylist/CreatePlaylist';
import Search from './components/MusicData/Search';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/create-playlist">
          <CreatePlaylist />
          <Search />
        </Route>
        <Route path="/">
          <UserAuth />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
