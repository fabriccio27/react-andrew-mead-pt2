import {createStore, combineReducers, applyMiddleware} from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import thunk from "redux-thunk";


//esto de aca abajo hace que cuando importe el default de este archivo, obtenga el store ya creado y configurado con sus reducers
export default (()=>{
    const store = createStore(
        combineReducers({
            expenses:expensesReducer,
            filter:filtersReducer
        }),
        applyMiddleware(thunk));

    return store;
})

