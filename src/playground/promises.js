const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        /* resolve("This is my resolved data"); // a resolve podria pasarle un objeto tranquilamente   
        resolve("Second resolved data"); */
        reject("Something went wrong.");
    },5000);
});

console.log("before");

promise.then( (data)=>{
    console.log(data)
}).catch(error=>{
    console.log(`Error: ${error}`);
    //aca podria poner para reintentar la tarea que resulto en rejection
});

console.log("after");

//esto es para ilustrar el orden en que la promesa no interrumpe el sincronismo
//IMPORTANTE, cada promise puede tener solo un resolve, por eso "Second resolved data" no sale en consola a partir de then
//si comento los resolve y solo dejo el reject en consola voy a ver error de uncaught promise si no configuro un catch para la promise
//la promise la suele generar la libreria, por ejempl, firebase, esto fue para ilustrar