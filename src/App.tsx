import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from "./pages/search-page";
import Navbar from "./components/navbar";
import { createStore, StoreProvider } from "./store";

const rootStore = createStore();

const App: React.FC = () => (
  <StoreProvider value={rootStore}>
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route component={SearchPage} />
        </Switch>
      </div>
    </Router>
  </StoreProvider>
);

export default App;
