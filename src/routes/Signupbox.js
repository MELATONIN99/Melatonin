import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";






export default function SignupBox() {
    const navigate = useNavigate();

    const onClcik = (event) => {
        event.preventDefault();
        const displayName = document.getElementById('displayName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const Auth = auth;
        createUserWithEmailAndPassword(Auth, email, password, displayName)
            .then((userCredential) => {
                
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName:displayName,
                })
                console.log(user);
                alert("회원가입 완료 로그인으로 이동");
                setTimeout(() => {
                    navigate("/login");
                  }, 1000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setTimeout(() => {
                    alert("오류",{errorMessage});
                  }, 1000);
            });
    }
    
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
