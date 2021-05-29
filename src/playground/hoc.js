//An High Order Component is a component that renders another component (one or many), ES COMO UN DECORATOR
/* por que usarlo?
permite reusar codigo
permite tomar control de lo que se renderiza
ayuda a abstraer el state */

// uso react-redux para no crear mi propio HOC, y usar el que me da la libreria

import React from "react";
import ReactDOM from "react-dom";


const Info  = (props) =>{
    return(
        <div>
            <h1>Info</h1>
            
            <p>This info is: {props.info} </p>
        </div>
    );
};

// lo que devuelve esta funcion de abajo es el HOC
const withAdminWarning = (WrappedComponent) => {
    return (props)=>(
        <div>
            {props.isAdmin && <p>You're admin, this is private info</p>}
            <WrappedComponent {...props}/> {/* lo que sea que vino en props, lo expando en sus pares key:value */}
        </div>
    );
};
const requiredAuthentication = (WrappedComponent) =>{
    // lo que regreso es un stateless functional component, no hace falta que lo nombre
    return (props)=>(
        <div>
            {props.isAuthenticated? <WrappedComponent {...props}/>:<p>Please, log in to see the info</p>}
        </div>
    );
};
//en AdminInfo tengo el HOC
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requiredAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info={"this is additional info."}/>, document.querySelector("#app"));
ReactDOM.render(<AuthInfo isAuthenticated={false} info={"this is additional info."}/>, document.querySelector("#app"));