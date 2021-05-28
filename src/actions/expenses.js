import {v4 as uuid} from "uuid";

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

export {addExpense, editExpense, removeExpense};