import styled from "styled-components";
import Navigation from "./Navigation";
import ArtBox from './ArtBox';
import OnlyText from './Onlytext';

const Section1Img = "../img/Section1img.jpg";

const Span1 = styled.span`
position: relative;
bottom: 50px;
color: yellow;
text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`

const SectionWrapper = styled.div`
overflow: hidden;
`

const BackContainer = styled.div`
 display: flex;
 flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 85vh;
`;

const BackImage = styled.img`
z-index: -99;
position: relative;
width: 85vw;
height: 80vh;
overflow: hidden;
`;



export default function Section1() {
  return (
    <SectionWrapper>
        <Navigation/>
    <BackContainer>
      <BackImage src={Section1Img} alt="backgrounds" className="randomback"/>
      <Span1>Welcome.</Span1>
      <Span1>Enjoy Melatonin Before Bedtime.</Span1>
      </BackContainer>
    </SectionWrapper>
  );
};