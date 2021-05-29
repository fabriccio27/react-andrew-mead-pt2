import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header from "../components/Header.js";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";


const AppRouter = () =>(

    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact={true} path="/" component={ExpenseDashboardPage} /> {/* if I remove the exact prop for this component,  every route starting with / will show this component also */}
                <Route exact={true} path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} /> {/* this will match /help and /help/whatever */}
                <Route component={NotFoundPage} /> {/* with Switch and no path defined, this will run if there's no match for any of the routes above */}
            </Switch>
                
        </div>
        
    </BrowserRouter>
);

export default AppRouter;