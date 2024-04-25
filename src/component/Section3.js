import styled from "styled-components";

const Section3Container = styled.div`
display: flex;
width: auto;
background-color: #3c3c3c;
`

const ImgWrapper = styled.div`
width: auto;
height: 100vh;
display: flex;
flex-direction: column;
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
background-color: #343434;
`
const diary1img = "../img/diary1.png";
const diary2img = "../img/diary2.png";

export default function Section3() {
  return (
    <Section3Container>
    <ContentWrapper>
    <ContentBox>
    Diary 페이지에서는 사진과 함께 사소한 일들을<br/><br/>
    기록할 수 있습니다.<br/><br/>
    토글스위치로 내가 쓴 일기만 모아보거나<br/><br/>
    다른 사람이 작성한 일기를 볼 수 있습니다.<br/><br/>
    잠들기전 그날의 일들을 공유하며 추억을 기록하세요.
    </ContentBox>
    </ContentWrapper>
    <ImgWrapper>
    <ImgBox src={diary1img} alt="todo1img"/>
    <ImgBox src={diary2img} alt="todo2img"/>
    </ImgWrapper>
    </Section3Container>
  );
};