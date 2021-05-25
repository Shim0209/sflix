import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Home from "Routes/Home";
import Search from "Routes/Search";
import TV from "Routes/TV";
import Detail from "Routes/Detail";
import Header from "Components/Header";
import TVDetail from "Routes/TVDetail";

export default () => (
    
    <Router>
        <>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/tv" exact component={TV} />
            <Route path="/search"  component={Search} />
            <Route path="/movie/:id" component={Detail} />
            <Route path="/tv/:id"  component={Detail} />
            <Route path="/tv/:id/detail"  component={TVDetail} />
            <Redirect from="*" to="/" />
        </>
    </Router>
)