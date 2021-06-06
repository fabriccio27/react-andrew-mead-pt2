import {firebase, googleProvider} from "../firebase/firebase";


//login y logout las voy a despachar desde app.js ni bien cambie el state de user logueado o no-logueado
export const login = (uid) =>{
    return {
        type:"LOGIN",
        uid
    };
};

//esto va a ser llamado por medio del boton en LoginPage
export const startLogin = () =>{
    //esto va a ser una accion async, por eso regreso una funcion, un metodo de firebase
    return ()=>{
        //pasarle googleProvider a una funcion es lo que arranca el proceso de auth
        return firebase.auth().signInWithPopup(googleProvider);
    };
};

export const logout = ()=>{
    return {
        type:"LOGOUT"
    };
};

export const startLogout = () =>{
    return ()=>{
        return firebase.auth().signOut();
    }
};