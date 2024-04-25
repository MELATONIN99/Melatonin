import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Section4Container = styled.div`
display: flex;
align-items: center;
  justify-content: center;
  flex-direction: column;
width: 100vw;
height: 100vh;
background-color: #3c3c3c;
`
const MiniBtn = styled.button`
  color: #BE9FE1;
  background-color: #2B2B2B;
  border-radius: 20px;
  border: 1px solid #BE9FE1;
  padding: 0px;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  &:hover,
  &:focus {
    background-color: #C9B6E4;
    color: #454545;
  }
`;

export default function Section4() {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/momentum");
    }
    return(
        <Section4Container>
        <MiniBtn onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>
START
        </MiniBtn>
        </Section4Container>
    );

};