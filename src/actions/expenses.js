import {v4 as uuid} from "uuid";
import database from "../firebase/firebase";
/* 
component calls action generator
action generator returns object
component dispatch object
redux store changes
*/
/* 
component calls action generator
action generator returns function
component dispatch function(needs middleware and to modify store) 
function runs 
*/

const addExpense = (expense) => {
    return {
        type:"ADD_EXPENSE",
        expense
    };
};
//si no agrego redux-thunk, no puedo procesar acciones que devuelven funciones en lugar de objetos
const startAddExpense  = (expenseData = {}) => {
    return (dispatch)=>{
        const {
            description="",
            note="",
            amount=0,
            createdAt=0
        } = expenseData; //esto es destructuracion del objeto, description, note etc se vuelven disponibles como variables

        const expense = {description,note,amount,createdAt}; //uso shorthand de js, key y value tienen mismo nombre
        //esto lo devuelvo para poder hacer chain de promises en test cases
        return database.ref("expenses").push(expense).then((refObj)=>{
            dispatch(addExpense({
                id:refObj.key,
                ...expense
            }));
        });
    };
}

const editExpense = (id, updates) => {
    return {
        type:"EDIT_EXPENSE",
        id,
        updates
    };
};
const removeExpense = ({id}={}) => {
    return {
        type:"REMOVE_EXPENSE",
        id
    }
}

export {addExpense, editExpense, removeExpense, startAddExpense};