// tengo que configurar wp para que este sea el entrypoint
import {createStore} from "redux";

// ACTIONS --------------------------------------------
//si no hay payload, lo seteo a obj vacio
//si no paso objeto vacio de default y no paso arg, undefined.incrementBy --> error
const incrementCount = (payload = {}) =>{
    return {
        //supongo que payload si no es el default es un obj con prop incrementBy
        type:"INCREMENT",
        incrementBy: typeof payload.incrementBy === "number"? payload.incrementBy: 1
    };
};
// asi como puedo destructurar objetos, puedo destructurar argumentos que son obj
/* 
--- seria const incrementCount = ({incrementBy} = {})=>{...cuerpodefuncion}
estoy diciendo que quiero la propiedad incrementBy del arg, y si no hay obj del cual destructurar que defaultee a obj vacio
al hacer esto, no hace falta anteponer payload en el objeto que devuelve la funcion
    incrementBy: typeof incrementBy==="number"?...
--- si const incrementCount = ({incrementBy=1} = {})=>{...cuerpodefuncion}
estoy diciendo que quiero la propiedad incrementBy del arg, y si no hay prop en el obj, que sea 1 (me ahorro el op ternario)
si no hay objeto, defaultea a obj vacio
*/

const decrementCount = ({decrementBy=1} = {}) => {
    return {
        type:"DECREMENT",
        decrementBy: decrementBy //en js, si nombre de prop y nombre de variable de value son iguales el shorthand es {...,decrementBy}
    };
};
const resetCount = () => {
    return {type:"RESET"};
};
const setCount = ({count}={})=>{
    //no paso valor default para prop count
    return {
        type:"SET",
        count:count
    };
}

// REDUCER ---------------------------------------------
/* 
1. reducer son pure functions. Output solo determinado por input (no usa cosas de afuera ni afecta cosas de afuera)
2. no tengo que modificar state ni actions. Puedo leerlos, pero lo que devuelvo es una representacion del nuevo estado
 */
const countReducer = (state = {count:0}, action) => {
    switch (action.type){
        case "INCREMENT":
            return {count:state.count + action.incrementBy};
        case "DECREMENT":
            return {count:state.count - action.decrementBy};
        case "RESET":
            return {count:0};
        case "SET":
            return {count: action.count};
        default:
            return state;
    }
    
};

const store = createStore(countReducer);

console.log("redux 101");

//console.log(store.getState());
store.subscribe(()=>{
    console.log(store.getState());
}); //el return value de store.subscribe(...) es una funcion que me permite dejar de escuchar

//con .subscribe estoy escuchando a los cambios de state. La callback se ejecuta cad vez que el state cambia
store.dispatch(incrementCount());
store.dispatch(incrementCount());
//IMPORTANTE, el reducer toma 2 argumentos, el 1ro es el state y el 2do la accion que le llega
/* por el console.log que puse veo,que en primer lugar, al crear el store, la accion que toma reducer es un init
luego con despacho la accion de incrementOne, esta es la accion que toma el reducer */
store.dispatch(decrementCount());
store.dispatch(resetCount());
store.dispatch(incrementCount({incrementBy:13})); 
store.dispatch(decrementCount({decrementBy:6}));
store.dispatch(setCount({count:101}));

