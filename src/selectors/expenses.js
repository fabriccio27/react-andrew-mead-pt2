import moment from "moment";

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    
    /* endDate y startDate son timestamps, integers que representa mseg antes o despues del 1/1/1970 */
    const filteredExpenses = expenses.filter((expense)=>{
        //1ra parte maneja en caso de que startDate sea undefined, es decir no pasé inicio de query, entonces me devuelve true y no me caga el statement final
        /* const startDateMatch = typeof startDate!=="number" || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate!=="number" || expense.createdAt <= endDate; */
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate? startDate.isSameOrBefore(createdAtMoment,"day") :true;
        const endDateMatch = endDate? endDate.isSameOrAfter(createdAtMoment,"day") :true;
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

export default getVisibleExpenses;