// tengo que configurar wp para que este sea el entrypoint
import {createStore} from "redux";

// ACTIONS --------------------------------------------
/* const incrementSome = (payload) =>{
    return {
        type:"INCREMENT",
        payload
    };
}; */
const incrementBy = {
    type:"INCREMENT",
    incrementBy:5
};
const decrementBy = {
    type:"DECREMENT",
    decrementBy:5
};
const resetCount = {
    type:"RESET"
};

// REDUCER ---------------------------------------------
const reducer = (state = {count:0}, action) => {
    switch (action.type){
        case "INCREMENT":
            const howMuch = typeof action.incrementBy==="number"? action.incrementBy : 1;
            return {count:state.count+howMuch};
        case "DECREMENT":
            const howLess = typeof action.decrementBy==="number"? action.decrementBy : 1;
            return {count:state.count-howLess};
        case "RESET":
            return {count:0};
        default:
            return state;
    }
    
};

const store = createStore(reducer);

console.log("redux 101");

//console.log(store.getState());
store.subscribe(()=>{
    console.log(store.getState());
}); //el return value de store.subscribe(...) es una funcion que me permite dejar de escuchar

//con .subscribe estoy escuchando a los cambios de state. La callback se ejecuta cad vez que el state cambia
store.dispatch(incrementBy);
store.dispatch({type:"DECREMENT"});
store.dispatch(incrementBy);
//IMPORTANTE, el reducer toma 2 argumentos, el 1ro es el state y el 2do la accion que le llega
/* por el console.log que puse veo,que en primer lugar, al crear el store, la accion que toma reducer es un init
luego con despacho la accion de incrementOne, esta es la accion que toma el reducer */
store.dispatch(decrementBy);
store.dispatch(resetCount);
store.dispatch({type:"INCREMENT"}); //this simulates action incrementBy with no payload

