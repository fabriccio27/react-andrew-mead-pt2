console.log("destructuring running...");

const person = {
    name:"Fabricio",
    age:30,
    location: {
        city:"La Plata",
        temperature:3
    }
}

// es un paja acceder a algo como person.name, o person.location.temperature. Para eso uso destructuring

const { p_name, age} = person;
//lado izquierdo variables que quiero extraer, lado derecho en que objeto estan
console.log(`${p_name} is ${age}`);
//puedo destructurar un objeto anidado, por ejemplo location
const {city, temperature} = person.location;
if(city && typeof temperature==="number"){
    console.log(`It's ${temperature} degrees in ${city}`);
}
//si no quisiera el nombre con el que viene la prop, en el destructurado puedo hacer un alias const {prop:nuevoNombre} = objeto
//si no hay valor para la prop (o no existe la prop), en el destructurado puedo hacer un default, const {prop=valorDefault} = objeto

const book = {
    title:"Ego is the enemy",
    author:"Ryan Hollister",
    publisher:{
        name:"Penguin"
    }
}

const {name:publisherName="Self-published"} = book.publisher;

console.log(publisherName);