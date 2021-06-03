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

database.ref("expenses").on("value", (snapshot)=>{
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
});
/* testExpenses.forEach(expense=>{
    database.ref("expenses").push({
        description:expense.description, 
        note:expense.note, 
        amount:expense.amount, 
        createdAt:expense.createdAt});
}); */

/* database.ref("notes").push({title:"Hola", body:"Cara de bola"})//push me genera una key que parece un id para el objeto que paso
.then(autput=>console.log(autput)) //autput es un objeto que es un choclo
.catch(err=>console.log(err));  */

//me interesa tener la data en mi app, hasta ahora la veia en la consola de firebase en browser. Con once, obtengo y listo, 
//tambien pueso usar on (parecido a subscribe). Con on uso callback y no promises, porque quiero saber de toque
//"value" es como un event, como si fuera "click". Otro eventos validos son "child_removed", "child_changed" y "child_added"
/* database.ref().on("value", (snapshot)=>{
    console.log(snapshot.val());
}, (error)=>{
    console.log("Error with the data fetching: ", error);
}); */
//esto esto de arriba puedo guardarlo en una variable y llamar a off con la variable para cancelar la suscripcion
/* setTimeout(()=>{
    database.ref("age").set(12);
},3500);
setTimeout(()=>{
    database.ref().off();
},7000); //con off cancelo el subscribe, el cambio de abajo sigue pasando pero no me avisa
setTimeout(()=>{
    database.ref("age").set(32);
},10500); */
/* database.ref()
.once("value")
.then((snapshot) => {
    const val = snapshot.val();
    console.log(val);//asi como esta, me printea un obj o un string, segun que pida en ref()
})
.catch((err)=>console.log(err)); */

/* 
- 1ro, uso la funcionalidad de database, recordemos que tiene auth y un par mas 
- 2do, ref es metodo para apuntar a distintas partes de mi db (asi como en sql tengo ~= tables o en mongodb ~= collections)
si no paso arg a ref, me apunta al root de la db, por eso tengo la estructura que tengo en la consola de firebase
- 3ro, set() devuelve una promise, asi que puedo encadenar then o catch a su llamada
*/
/* const database = firebase.database();
database.ref().set({
    name: "fabricio saavedra",
    stressLevel:6,
    age:30,
    job:{
        title:"software developer",
        company:"cachito llc"
    },
    location:{
        city:"philadelphia",
        country:"Argentina"
    }
})
.then(()=>console.log("the object was set"))
.catch(err=>console.log(`There was an error:\n${err}`));  */

//si ya esta en la db, esto lo puedo de arriba lo puedo comentar
//para disparar esto puedo bloquear el acceso en firebase con las rules
//devuelve --> Error: PERMISSION_DENIED: Permission denied
//database.ref().set("This is my data."); 
//setea el root de mi db a un string, o sea no hace falta que siempre pase objs
//set siempre borra un valor original o previo de referencia, en este caso, el objeto que pasé 1ro no está mas
/* database.ref().set({
    age:31
});  */
//esto de arriba me setea la referencia a root con obj de esa sola prop, no es que actualiza la referencia anterior
//PARA ACTUALIZAR SERIA
//database.ref("age").set(29);
//database.ref("location/country").set("ARG");
//con esto agrego una prop, al root, que es el objeto que hice apuntar
//PARA BORRAR SERIA
/* database.ref("isSingle").remove()
.then(()=>console.log("data from isSingle deleted"))
.catch(err=>console.log("This happened while trying to delete something:\n",error)); */
//borra el par key:value 
/* otra forma seria
database.ref("isSingle").set(null); */
//PARA ACTUALIZAR SERIA
/* database.ref().update({
    name:"Seba Driussi",
    age:28,
    isSingle:null
}) */ //tambien podria agregar una prop que no esta o borrar seteando prop a null
//para actualizar algo anidado tengo que escribir key como si fuera path al valor a cambiar
/* database.ref().update({
    job:"woodworker",
    "location/city":"Chicago"
}) */
/* database.ref().update({
    stressLevel:9,
    "job/company":"amazon",
    "location/city":"seattle"
})
.then(()=>console.log("data was updated"))
.catch((error)=>console.log(`This happened while trying to update data:\n${error}`)); */