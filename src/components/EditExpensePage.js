import React from "react";

//react-router esta pasando un objeto props por nosotros con cierta informacion

/* Object { history: {…}, location: {…}, match: {…}, staticContext: undefined }
​
history: Object { length: 32, action: "PUSH", location: {…}, … }
​
location: Object { pathname: "/edit", search: "", key: "j1wn4l", … }
​
match: Object { path: "/edit", url: "/edit", isExact: true, … }
​
staticContext: undefined */

const EditExpensePage = (props) => {
    console.log(props);
    return(
        <div>
            This is the edit expense page for {props.match.params.id}
        </div>
    )
}

export default EditExpensePage;

// en history tengo lo que necesita react-router para hacer client-side routing, metodos para redirigir y demas solo con js
// componentes que no fueron seteados para un Route no tienen props --> Header no recibe props. 
// en location tengo info de query strings si las hubiera, y de hash
// en match tengo info de parametros URL, por ejemplo localhost/edit/45, 45 es un para URL, el cual puede ser un id p/una db
    //para poder agregar esos params URL tengo que configurar el path de edit en el componente Route a path="/edit/:id"
    //esta disponible en match.params como para {"id":4556}, por ejemplo