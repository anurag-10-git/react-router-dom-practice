import { Route, Switch, Redirect } from "react-router-dom/cjs/react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetails from "./pages/QuoteDetails";
import NewQuotes from "./pages/NewQuotes";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path='/'>
          <Redirect to="/quotes"/>
        </Route>
        <Route exact path='/quotes'>
          <AllQuotes/>
        </Route>
        <Route path='/quotes/:quoteId'>
          <QuoteDetails/>
        </Route>
        <Route path='/new-quote'>
          <NewQuotes/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
