import {firebase, googleProvider} from "../firebase/firebase";

//esto va a ser llamado por medio del boton en LoginPage
export const startLogin = () =>{
    //esto va a ser una accion async, por eso regreso una funcion, un metodo de firebase
    return ()=>{
        //pasarle googleProvider a una funcion es lo que arranca el proceso de auth
        return firebase.auth().signInWithPopup(googleProvider);
    };
};

export const startLogout = () =>{
    return ()=>{
        return firebase.auth().signOut();
    }
};