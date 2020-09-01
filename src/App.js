import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/home-page.component";
import { Route, Link, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header.component/header.component";

const HatsPage = (props) => (
  <div>
    <h1>Hats page</h1>
    <button onClick={() => props.history.push("/hatspage/:topicId")}>
      tuka
    </button>
    <Link to="/hatspage/:topicId">tuka</Link>
  </div>
);

const Hat = (props) => (
  <div>
    <h1>Hat number :{props.match.params.topicId}</h1>
  </div>
);

function App() {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/shop/hats" component={HatsPage}></Route>
        <Route path="/hatspage/:topicId" component={Hat}></Route>
        <Route exact path="/shop" component={ShopPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
