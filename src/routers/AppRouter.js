import React from "react";
import {Router, Route, Switch} from "react-router-dom";

//import Header from "../components/Header.js"; header lo voy a mostrar dependiendo de las rutas, por eso lo muevo a PrivateRoute
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import { createBrowserHistory } from 'history';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


export const history =  createBrowserHistory(); 
//si uso Router en lugar de BrowserRouter, le puedo pasar mi instancia de history
//quiero que me deje ir a LoginPage solo si no estoy authenticado, si no que me redirija a dashboard
const AppRouter = () =>(

    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute exact={true} path="/" component={LoginPage}/>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} /> {/* if I remove the exact prop for this component,  every route starting with / will show this component also */}
                <PrivateRoute exact={true} path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route component={NotFoundPage} /> {/* with Switch and no path defined, this will run if there's no match for any of the routes above */}
            </Switch>
                
        </div>
        
    </Router>
);

export default AppRouter;