import styled from "styled-components";
import Background from "../component/Background"
import { auth } from "../firebase/firebase";
import Clock from "../component/Clock";
import Todo from "../component/Todo";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Overlay = styled.div`
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: 'Noto Sans KR', sans-serif;
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
        <ClockWrapper>
            <Clock/>
        </ClockWrapper>
       <Greeting>Hello {displayName}</Greeting>
       <Todo/>
       </Overlay>
    </div>
        
    )
};