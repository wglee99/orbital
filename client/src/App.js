import NavTabs from "./components/Navbar";
import Countries from "./components/CountriesPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";

import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/authRedux";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Countries} />
          <Route exact path="/places" component={NavTabs} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
