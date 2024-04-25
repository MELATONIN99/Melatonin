import styled from "styled-components";

const Section2Container = styled.div`
display: flex;
width: auto;
`

const ImgWrapper = styled.div`
width: auto;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-around;
background-color: #3c3c3c;
`

const ImgBox = styled.img`
width: 50vw;
height: 50vh;
`

const ContentWrapper = styled.div`
width: 100vw;
margin: 0px 10px 0px 10px;
display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`
const ContentBox = styled.div`
height: 40vh;
padding: 10px 0px;
  color: #dedede;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #BE9FE1;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
background-color: #3c3c3c;
`
const todo1img = "../img/todo1.jpg";
const todo2img = "../img/todo2.jpg";

export default function Section2() {
  return (
    <Section2Container>
    <ImgWrapper>
    <ImgBox src={todo1img} alt="todo1img"/>
    <ImgBox src={todo2img} alt="todo2img"/>
    </ImgWrapper>
    <ContentWrapper>
    <ContentBox>
    Momentum 페이지에서는 랜덤한 배경과 함께<br/><br/>
    현재의 날씨, 시계, TodoList 혹은 DoneList를 제공합니다.<br/><br/>
    잠들기 전 차 한 잔을 마시며 일상을 정리하는 것과 같은<br/><br/>
    Momentum 페이지에서의 편안한 시간을 만끽해 보세요.
    </ContentBox>
    </ContentWrapper>
    </Section2Container>
  );
};