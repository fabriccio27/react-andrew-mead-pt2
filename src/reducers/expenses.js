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
        case "SET_EXPENSES":
            return action.expenses;
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

export default expensesReducer;