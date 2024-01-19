import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";



function onClcik(event) {
    event.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const Auth = auth;
    createUserWithEmailAndPassword(Auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}



export default function SignupBox() {
    return (
<div className="login-wrapper">
    <h1>Melatonin.</h1>
    <h2>Login</h2>
        <form id="login-form">
            <input type="text" name="userDisplayName" placeholder="Name"id="displayName"/>
            <input type="text" name="userName" placeholder="Email" id="email"/>
            <input type="password" name="userPassword" placeholder="Password" id="password"/>
            <button onClick={onClcik} id="signupbtn">Sign Up</button>
            <div className="link-to-account">Already have an account?
            <br/><Link to="/login">Sign in</Link></div>
        </form>
</div>
  
);  
};
