// src/routes.js
import React from "react";
import {Router, Route} from "react-router";
import App from "./components/App/App";
import AsyncApp from "./containers/AsyncApp";
import configureStore from "./configureStore";
import { Provider } from 'react-redux'

const store = configureStore();

const About = React.createClass({
    render() {
        return (
            <div>Hello</div>
        );
    }
});

const NotFound = React.createClass({
    render() {
        return (
            <div>No match</div>
        );
    }
});

const Routes = (props) => (
    <Provider store={store}>
        <Router {...props}>
            <Route path="/" component={App}/>
            <Route path="/about" component={About}/>
            <Route path="/AsyncApp" component={AsyncApp}/>
            <Route path="*" component={NotFound}/>
        </Router>
    </Provider>
);

export default Routes;