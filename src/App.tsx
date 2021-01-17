import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from "./pages/search-page";
import Navbar from "./components/navbar";

const App: React.FC = () => (
  <Router>
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={SearchPage} />
        <Route component={SearchPage} />
      </Switch>
    </div>
  </Router>
);

export default App;
