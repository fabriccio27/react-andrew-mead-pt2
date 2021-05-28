import {createStore, combineReducers} from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";


//esto de aca abajo hace que cuando importe el default de este archivo, obtenga el store ya creado y configurado con sus reducers
export default (()=>{
    const store = createStore(combineReducers({
        expenses:expensesReducer,
        filter:filtersReducer
    }));

    return store;
})

