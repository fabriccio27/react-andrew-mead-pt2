import React from "react";
import ReactDOM from "react-dom"; 
import {Provider} from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import {addExpense} from "./actions/expenses";
//import {setTextFilter} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

const store = configureStore();

//probar un par de acciones
store.dispatch(addExpense({description:"Water bill", amount:1300, createdAt:15000}));
store.dispatch(addExpense({description:"Gas bill", amount:1800, createdAt:20000}));
store.dispatch(addExpense({description:"Rent", amount:109500, createdAt:15000}));

//store.dispatch(setTextFilter("water")); //esto en realidad lo quiero manejar a través de UI/UX
console.log("test");
const state = store.getState();

const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);


/* con Provider, le puedo dar acceso directo al store a los distintos componentes que lo necesiten
connect lo voy a usar en c/componente para poder leer del store o despachar acciones
 */
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.querySelector("#app"));

