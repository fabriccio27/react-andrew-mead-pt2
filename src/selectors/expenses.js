import moment from "moment";

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    
    const filteredExpenses = expenses.filter((expense)=>{
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate? startDate.isSameOrBefore(createdAtMoment,"day") :true;
        const endDateMatch = endDate? endDate.isSameOrAfter(createdAtMoment,"day") :true;
        const textMatch= expense.description.toLowerCase().includes(text.toLowerCase()); // .includes no es caseInsensitive, lo tengo que hacer yo
        return startDateMatch && endDateMatch && textMatch;
    });

    return filteredExpenses.sort((a,b)=>{
        if (sortBy==="date"){
            //ordena desde el mas reciente. Si comparo a y b, y quiero que b vaya primero, devuelvo 1
            return a.createdAt<b.createdAt?1:-1;
        }
        else if (sortBy==="amount"){
            return a.amount < b.amount?1:-1;
        }
    });

}

export default getVisibleExpenses;