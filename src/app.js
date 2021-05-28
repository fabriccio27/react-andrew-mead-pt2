import React from "react";
import ReactDOM from "react-dom"; 
import "normalize.css/normalize.css";
import "./styles/styles.scss";

import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

const store = configureStore();


//probar un par de acciones
store.dispatch(addExpense({description:"Water bill", amount:1300, createdAt:15000}));
store.dispatch(addExpense({description:"Gas bill", amount:1800, createdAt:20000}));
console.log(store.getState());
store.dispatch(setTextFilter("water"));

const state = store.getState();

const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
console.log(visibleExpenses);

ReactDOM.render(<AppRouter/>, document.querySelector("#app"));

