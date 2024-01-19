import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Logout from '../component/Logout.js';
import { auth } from "../firebase/firebase.js";
import { Link } from "react-router-dom";


function onClcik(event) {
event.preventDefault();
const email = document.getElementById('email').value
const password = document.getElementById('password').value
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
    console.log(user)
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
};





export default function LoginBox() {

    return (
<div className="login-wrapper">
  <h1>Melatonin.</h1>
  <h2>Login</h2>
        <Logout/>
        <form id="login-form">
            <input type="text" name="userName" placeholder="Email" id="email"/>
            <input type="password" name="userPassword" placeholder="Password" id="password"/>
            <button type="submit" value="Login" onClick={onClcik}>Login</button>
            <div className="link-to-account">Don't have an account?
            <br/><Link to="/signup">Sing Up</Link></div>
        </form>
</div>
  
);  
};



