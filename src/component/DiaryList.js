import { Switch } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"
import MyDiary from "./MyDiary"
import Timeline from "./Timeline"

const Diary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50vw;
  max-width: 600px;
  height: auto;
  margin: auto;
`











export default function DiaryList() {
  const [isDiary, setisDiary] = useState(true);

  const handleChange = (event) => {
    setisDiary(event.target.checked);
  };

  

    return(
      <Diary>
        <Switch 
        checked={isDiary}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{
          '& .MuiSwitch-thumb': {
              backgroundColor: '#BE9FE1', // 썸의 색상 변경
          },
          '& .MuiSwitch-track': {
              backgroundColor: '#E1CCEC', // 트랙의 기본 색상
          },
          '&.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#C9B6E4', // 활성화 상태에서의 트랙 배경색 변경
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
              '& + .MuiSwitch-track': {
                  backgroundColor: 'purple', // 체크 상태에서의 트랙 배경색 변경
              }
          }
      }}
        />
            {isDiary ? <MyDiary/> : <Timeline/>}
      </Diary>
    )
}