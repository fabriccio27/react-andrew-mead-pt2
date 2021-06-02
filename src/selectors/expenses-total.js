const getExpensesTotal = (expenses) =>{

    //el checkeo de si es array vacio lo hago por mi aproximacion al problema, pero si le paso array vacio a reduce,
    //me va a devolver cero igual
    if(expenses.length===0){
        return 0;
    } else {
        //aca podria convertir de array de objs a array de amounts, por eso nombraba a usar maps
        const result = expenses.reduce((total,expense)=>{
            return total + expense.amount;
        },0);
        return result;
    }
};
export default getExpensesTotal;