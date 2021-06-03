import firebase from "firebase";
import testExpenses from "../tests/fixtures/expenses";
var config = {
    apiKey: "AIzaSyASxQUiNH5fhrZs5_9uwejBtkHYj_aXmgM",
    authDomain: "expensify-fs.firebaseapp.com",
    databaseURL: "https://expensify-fs-default-rtdb.firebaseio.com",
    projectId: "expensify-fs",
    storageBucket: "expensify-fs.appspot.com",
    messagingSenderId: "830574263184",
    appId: "1:830574263184:web:303106e2283e26d0425115",
    measurementId: "G-2501W0ZK0W"
};

firebase.initializeApp(config);
const database = firebase.database();

export {firebase, database as default};

/* database.ref("expenses").once("value")
.then((snapshot)=>{
    //console.log(snapshot.val());//esto me devuelve el "array" de expenses
    const retExpenses = [];
    //en documentacion sale que objeto snapshot tiene metodo forEach, lo que facilita las cosas
    snapshot.forEach(childSnap=>{
        retExpenses.push({
            id:childSnap.key, //cada childSnap tiene una prop key, sale en la documentacion
            ...childSnap.val() //como a priori yo no sabria que key values tiene, uso spread
        })
    });
    console.log(retExpenses);
});  */

/* database.ref("expenses").on("value", (snapshot)=>{
    const arr = [];
    snapshot.forEach(childSnap=>{
        arr.push({
            id:childSnap.key,
            ...childSnap.val()
        });
    });
    console.log(arr);
}, (error)=>{
    console.log("Error with the data fetching: ", error);
}); */
/* testExpenses.forEach(expense=>{
    database.ref("expenses").push({
        description:expense.description, 
        note:expense.note, 
        amount:expense.amount, 
        createdAt:expense.createdAt});
}); */

