import React from "react";
import ReactDOM from "react-dom"; 
import "normalize.css/normalize.css";
import "./styles/styles.scss";

import {BrowserRouter, Route} from "react-router-dom"

const ExpenseDashboardPage = ()=> (
    <div>
        This is the dashboad page
    </div>
);
const AddExpensePage = () => (
    <div>
        This is the add expense page
    </div>
)
const EditExpensePage = () => (
    <div>
        This is the edit expense page
    </div>
)
const HelpPage = () => (
    <div>
        This is the help page
    </div>
)
const routes = (
    <BrowserRouter>
        <div>
            <Route exact={true} path="/" component={ExpenseDashboardPage} /> {/* if I remove the exact prop for this component,  every route starting with / will show this component also */}
            <Route exact={true} path="/add" component={AddExpensePage} />
            <Route exact={true} path="/edit" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
        </div>
        
        {/* <Route />
        <Route /> */}
    </BrowserRouter>
)
ReactDOM.render(routes, document.querySelector("#app"));

