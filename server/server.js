const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;
/* Using app.use lets us serve up the entire public directory which contains more than just index.html. 
So we want that folder to be served up for sure.
Using app.get lets us serve up index.html for anything that's not matched in public. 
This is also an important piece for our app to actually work when using those client-side routes.
We need both. The public folder isn't getting served up twice */


const publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));

app.get("*", (req, res)=>{
    res.sendFile(path.join(publicPath, "index.html"));
});
//esto es para cuando voy a una pagina de mi app desde la barra de direcciones y no de un componente
//si pongo localhost:3000/create, el browser va a tratar de servir una carpeta create relativa public
//cuando yo lo que quiero es que para todas las rutas sin match, use el comportamiento de index.html

//3000 es valido para un puerto estatico, no para un server de produccion

app.listen(port, ()=>{
    console.log("server is up!");
});

// para que esto corra, el build de produccion ya tiene que existir