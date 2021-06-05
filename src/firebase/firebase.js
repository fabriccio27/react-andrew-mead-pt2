import firebase from "firebase";

// NOMBRE PUBLICO PROJECT AUTH --> project-830574263184

//import testExpenses from "../tests/fixtures/expenses";
//los valores de config van a apuntar a distintas dbs segun que env este definido, test o development.
var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_API_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(config);
const database = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// una vez que exporto esto de arriba puedo empezar a generar funciones que arranquen el proceso de autenticacion

export {firebase, googleProvider, database as default};

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

