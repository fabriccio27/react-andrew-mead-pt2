import React from "react";
import ReactDOM from "react-dom"; 
import {Provider} from "react-redux";
import {startSetExpenses} from "./actions/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";


import "./firebase/firebase";


const store = configureStore();

/* con Provider, le puedo dar acceso directo al store a los distintos componentes que lo necesiten
connect lo voy a usar en c/componente para poder leer del store o despachar acciones
 */
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);


ReactDOM.render(<p>Loading...</p>, document.querySelector("#app"));
store.dispatch(startSetExpenses()).then(()=>{
    ReactDOM.render(jsx, document.querySelector("#app"));
});


