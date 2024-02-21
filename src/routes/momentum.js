import styled from "styled-components";
import Background from "../component/Background"
import { auth } from "../firebase/firebase";
import Clock from "../component/Clock";
import Todo from "../component/Todo";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Weather from "../component/Weather";


const Overlay = styled.div`
    z-index: -1; 
    display: flex;  
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: 'Noto Sans KR', sans-serif;
    width: 100vw;
    height: 85vh;
`;

const ClockWrapper = styled.div`
  font-weight: bold;
  font-size: 120px;
`;

const Greeting = styled.div`
    font-size: 50px;
    margin: 0px;    
    font-weight: bold;
`;

const TodoWrapper = styled.div`
position: static;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
width: 40%;
top:400px;
`

export default function Momentum() {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [displayName, SetDisplayName] = useState("");
    useEffect(() => {
    if ( user == null) {
        setTimeout(() => {
        navigate("/");
    }, 0);
    }
    else if ( user !== null ) {
        SetDisplayName(user.displayName);
    }
},[]);
    return(
    <div>
       <Background/>
       <Overlay>
        <Weather/>
        <ClockWrapper>
            <Clock/>
        </ClockWrapper>
       <Greeting>Hello {displayName}</Greeting>
       <TodoWrapper>
       <Todo/>
       </TodoWrapper>
       </Overlay>
    </div>
        
    )
};