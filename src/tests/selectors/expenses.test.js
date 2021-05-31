import selectExpenses from "../../selectors/expenses";
import moment from "moment";

//este era el filtro segun texto o fecha
const expenses = [
    {
        id:"1",
        description:"Gum",
        note:'',
        amount:195,
        createdAt:moment(0)
    },
    {
        id:"2",
        description:"Rent",
        note:'',
        amount:109500,
        createdAt:moment(0).subtract(4,"days").valueOf()
    },
    {
        id:"3",
        description:"Credit card",
        note:'',
        amount:4500,
        createdAt:moment(0).add(4,"days").valueOf()
    }
];

test("should filter if input text matches description text", ()=>{
    //a selectExpenses le pasaba todo el array de expenses y los criterios de filtrado. Voy a necesitar data de test
    const filter = {
        text:"e",
        sortBy:"date",
        startDate:undefined,
        endDate:undefined
    }
    const result = selectExpenses(expenses, filter);
    expect(result).toEqual([expenses[2],expenses[1]]); // el orden es importante porque estoy pasando en filter sortBy:"date"
});


test("should filter by starDate", ()=> {
    //En este test case el tema es que mi funcion de ordenar en selectors/expenses.js tiene precision de un dia, tengo que
    //poner tiempos de diferencia razonable en mi test data para saber si la prueba funciona o no
    const filter = {
        text:"",
        sortBy:"date",
        startDate:moment(0),
        endDate:undefined
    };
    const result = selectExpenses(expenses, filter);
    //que espero, el startDate tiene que ser posterior o igual al moment(0), entonces va a mostrar el 3ro y el 1ro, en ese orden
    expect(result).toEqual([expenses[2],expenses[0]]);

});

//filtrar por endDate,
test("should filter by endDate",()=>{
    const filter = {
        text:"",
        sortBy:"date",
        startDate:undefined,
        endDate:moment(0) //esto hace que tiene que mostrarme expenses con fecha en moment(0) o menor/anterior
    };
    const result = selectExpenses(expenses,filter);
    expect(result).toEqual([expenses[0], expenses[1]]);
});
//ordenar por fecha,
test("should sort by date",()=>{
    const filter = {
        text:"",
        sortBy:"date",
        startDate:undefined,
        endDate:undefined
    };
    const result = selectExpenses(expenses,filter);
    expect(result).toEqual([expenses[2],expenses[0],expenses[1]]);
})
//ordenar por cantidad,
test("should sort by amount", ()=>{
    const filter = {
        text:"",
        sortBy:"amount",
        startDate:undefined,
        endDate:undefined
    };
    const result = selectExpenses(expenses,filter);
    
    expect(result).toEqual([expenses[1],expenses[2],expenses[0]]);
});