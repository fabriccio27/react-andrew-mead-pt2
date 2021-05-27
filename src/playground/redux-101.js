// tengo que configurar wp para que este sea el entrypoint
import {createStore} from "redux";

const reducer = (state = {count:0}, action) => {
    //console.log(action.type); @@redux/INITx.x.l.g.e.h este es action.type en creacion de store
    switch (action.type){
        case "INCREMENT":
            return {count:state.count+1};
        case "DECREMENT":
            return {count:state.count-1};
        case "RESET":
            return {count:0};
        default:
            return state;
    }
    //no hago modificaciones directas sobre el estado. Si el estado_0 es un obj con prop count, devuelvo un obj con prop count
};
//el store es la cosa que sigue el cambio de data en el tiempo
const store = createStore(reducer);

console.log("redux 101");

console.log(store.getState());

//para cambiar el state uso actions: increment, decrement, reset
//cuando tengo una accion la despacho al store. Segun la accion que le llega al store, efectua una operacion sobre el state
const incrementOne = {
    type:"INCREMENT"
};
const decrementOne = {
    type:"DECREMENT"
};
const resetCount = {
    type:"RESET"
};
//cada vez que despacho una accion, corre el reducer
store.dispatch(incrementOne);
store.dispatch(incrementOne);
//IMPORTANTE, el reducer toma 2 argumentos, el 1ro es el state y el 2do la accion que le llega
/* por el console.log que puse veo,que en primer lugar, al crear el store, la accion que toma reducer es un init
luego con despacho la accion de incrementOne, esta es la accion que toma el reducer */
console.log(store.getState());
store.dispatch(decrementOne);
console.log(store.getState());
store.dispatch(resetCount);
console.log(store.getState());