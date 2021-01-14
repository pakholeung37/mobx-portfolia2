import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from "./pages/search-page";
import Navbar from "./components/navbar";
import RootStore from "./store/RootStore";
import { Provider } from "mobx-react";

class App extends React.Component {
  stores = new RootStore();

  render() {
    return (
      <Provider {...this.stores}>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route component={SearchPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
