import React from "react";
import Navigation from "./navigation";
import store from "./_redux";
import {
    Provider
} from "react-redux";

const App = () => {
    return <Provider
        store={store}
    >
        <Navigation />
    </Provider>;
};

export default App;