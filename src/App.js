import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
//nhận 3 tham sô: component để render nếu điều kiện true, trạng thái xác thực và rest(ES6),
//kiểm tra nếu authenticated true và render component, nếu không nó sẽ chuyển hướng đến /login.

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/chat" />
        )
      }
    />
  );
}
// <PublicRoute> khá giống <PrivateRoute>.
//Nó render các public routes và chuyển hướng đến đường dẫn /chat nếu authenticated state đúng.

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <h2>Loading...</h2>
    ) : (
      <Switch>
        <Redirect exact from="/" to="/login" />
        <PrivateRoute
          path="/chat"
          authenticated={this.state.authenticated}
          component={Chat}
        ></PrivateRoute>
        <PublicRoute
          path="/signup"
          authenticated={this.state.authenticated}
          component={Signup}
        ></PublicRoute>
        <PublicRoute
          path="/login"
          authenticated={this.state.authenticated}
          component={Login}
        ></PublicRoute>
      </Switch>
    );
  }
}

export default App;
