import styled from "styled-components";
import Navigation from "./navigation";


const RandombackContainer = styled.div`

`;

const RandombackImage = styled.img`
    z-index: -99;
`

export default function Background() {
    const images = [
        "../img/0.jpg",
        "../img/1.jpg",
        "../img/2.jpg",
        "../img/3.jpg",
        "../img/4.jpg",
    ]   
    const chosenImage = images[Math.floor(Math.random() * images.length)];


  
    
    return(
        <RandombackContainer>
        <RandombackImage
          src={chosenImage} alt="backgrounds" className="randomback"
        />
        <Navigation />
        </RandombackContainer>
    );
  }