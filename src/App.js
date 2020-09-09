import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/home-page.component";
import { Route, Link, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header.component/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import ShopPageTest from "./pages/shop/shop.component-test";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

/*const HatsPage = (props) => (
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
        <Route exact path="/shop/hats" component={HatsPage}></Route>
        <Route path="/hatspage/:topicId" component={Hat}></Route>
      </Switch>
    </div>
  );
}

*/

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          console.log(this.state);
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/shop" component={ShopPage}></Route>
          <Route path="/signin" component={SignInAndSignUpPage}></Route>
          <Route path="/shop/:id" component={ShopPageTest}></Route>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
