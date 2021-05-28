import {createStore, combineReducers} from "redux";
import {v4 as uuid} from "uuid"; // esto es un generador de ids

// como regla voy a usar un reducer por cada root prop en el store/state
// combineReducers toma un objeto como arg. En el obj tengo pares key:value con rootProp1:reducerpararootProp1, rootProp2;reducerparaProp2
const demoState = {
    expenses:[{
        id:"sd7giu23g",
        description:"January Rent",
        note:"This was the final pay for this month",
        amount:54500,
        createdAt:0
    }],
    filter:{
        text:"rent",
        sortBy:"amount", // date or amount
        startDate:undefined,
        endDate:undefined
    }
}
//actions
const addExpense = ({description="",note="",amount=0,createdAt=0}={}) => {
    return {
        type:"ADD_EXPENSE",
        expense: {
            id:uuid(),
            description,
            note,
            amount,
            createdAt
        }
    };
};
/* para quitar expense lo hago por su id, despues en reducer manipulo el nuevo state (voy a usar filter). 
El id lo saco del return value del dispatch, que es la accion que le pasé
*/
const removeExpense = ({id}={}) => {
    return {
        type:"REMOVE_EXPENSE",
        id
    }
}
/* para editar una expensa voy a hacer uso del spread op en objetos y el id del obj 
aca paso las actualizaciones tal como el objeto que vino, y en el reducer hago el spread de las actualizaciones*/
const editExpense = (id, updates) => {
    return {
        type:"EDIT_EXPENSE",
        id,
        updates
    };
};

const setTextFilter = (text = "") => {
    return {
        type:"SET_TEXT_FILTER",
        text
    };
}
//estos dos generadores de acciones me van a modificar en state.filter la prop sortBy, definiendo asi el criterio de orden
const sortByDate= ()=>({type:"SORT_BY_DATE"});
const sortByAmount= ()=>({type:"SORT_BY_AMOUNT"});
//en realidad no hace falta que pase undefined como default, se setea solo a undefined si no pase argumento 
const setStartDate = (startDate=undefined) => {
    return {
        type:"SET_START_DATE",
        startDate
    }
}
const setEndDate = (endDate=undefined) => {
    return {
        type:"SET_END_DATE",
        endDate
    }
}
// REDUCERS -----------------------------------------
const expReducerDefaultState = [];
const expensesReducer = (state=expReducerDefaultState, action) =>{
    switch(action.type){
        case "ADD_EXPENSE":
            return [...state,action.expense]; //si no podria hacer arr1.concat(). Tambien, puedo hacer spread para objetos
        case "REMOVE_EXPENSE":
            const newState = state.filter((obj) => {
                // a obj lo podria destructurar a {id}
                return obj.id!==action.id;
            });
            return newState;
        case "EDIT_EXPENSE":
            const modState = state.map(exp=>{
                if (exp.id===action.id){
                    return {
                        ...exp,
                        ...action.updates 
                    }
                    // SPREAD DEL OBJETO DE ACTUALIZACIONES :O!
                    //return modified expense
                }else{
                    return exp; // return the expense just as it was
                }
            });
            // si tuvieras mas operaciones sobre el state, directamente devovler el return value de filter, map, etc, o te vas a quedar sin nombres para los states modificados
            return modState;
        default:
            return state;
    }
}

const filReducerDefaultState = {
    text:"",
    sortBy:"date",
    startDate:undefined,
    endDate:undefined
}
const filtersReducer = (state=filReducerDefaultState, action) =>{
    switch(action.type){
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text:action.text
            };
        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy:"amount"
            };
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy:"date"
            };
        case "SET_START_DATE":
            return {
                ...state,
                startDate:action.startDate
            };
        case "SET_END_DATE":
            return {
                ...state,
                endDate:action.endDate
            };
        default:
            return state;
    }
}

//GET VISIBLE EXPENSES -------------------------------
//en subscribe voy a cambiar la data logueada. Destructuro filters en esos 4 parametros, en 1era instancia sortBy no le doy bola
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    
    /* endDate y startDate son timestamps, integers que representa mseg antes o despues del 1/1/1970 */
    const filteredExpenses = expenses.filter((expense)=>{
        //1ra parte maneja en caso de que startDate sea undefined, es decir no pasé inicio de query, entonces me devuelve true y no me caga el statement final
        const startDateMatch = typeof startDate!=="number" || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate!=="number" || expense.createdAt <= endDate;
        const textMatch= expense.description.toLowerCase().includes(text.toLowerCase()); // .includes no es caseInsensitive, lo tengo que hacer yo
        return startDateMatch && endDateMatch && textMatch; //devolver expense si se cumplen las 3 condiciones
    });

    return filteredExpenses.sort((a,b)=>{
        if (sortBy==="date"){
            //ordena desde el mas reciente. Si comparo a y b, y quiero que b vaya primero, devuelvo 1
            return a.createdAt<b.createdAt?1:-1;
        }
        else if (sortBy==="amount"){
            return a.amount > a.amount?-1:1;
        }
    });

}




//STORE -----------------------------------------------

//cuando despacho una accion llega a los 2 reducers, pero solo hace algo en el reducer para el cual esta definido el caso en switch
const store = createStore(combineReducers({
    expenses:expensesReducer,
    filter:filtersReducer
}));

store.subscribe(()=>{
    const state = store.getState();
    const visibles = getVisibleExpenses(state.expenses, state.filter);
    console.log(visibles); //si getVisibleExpenses regresa todas las expenses sin criterio alguno, esto es lo mismo que printear state.expenses
});
//console.log(store.getState()); //el array vacio muestra si no uso el combine. Cuando uso el combine da expenses:[]
const firstExpense = store.dispatch(addExpense({description:"Rent", amount:19, createdAt:-21000}));
const secondExpense = store.dispatch(addExpense({description:"Coffee", amount:400, createdAt:-1000}));

//console.log(firstExpense.expense.id);
//store.dispatch(removeExpense({id:firstExpense.expense.id})); // me deberia quedar ahora solo el de description=="Rent" en el array de expenses

/* const userrr = {name:"coco",age:37}
console.log({
    ...userrr,
    age:42
}) //conservo el nombre pero edito edad y no modifico userrr, el obj a clonar tiene que ir 1ro, cambios previos no sobrescriben
 */
//store.dispatch(editExpense(secondExpense.expense.id, {amount:560}));
//console.log("Probando setTextFilter...");
//store.dispatch(setTextFilter("rent")); //esto debe modificar en el obj de filter en el state, la prop text. Puede ser vacio o string. 
// en especifico esto de arriba me tiene que mostrar expensas con solo descriptio rent
//store.dispatch(setTextFilter(""));
console.log("Probando sortBy...");
store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

//console.log("probando setStartDate...");
//store.dispatch(setStartDate(125)); //-2000 me muestra los 2, pues startDate son -1000 y 1000
/* store.dispatch(setStartDate());
console.log("probando setEndDate");
store.dispatch(setEndDate(27));
store.dispatch(setEndDate()); */