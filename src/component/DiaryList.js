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
        />
            {isDiary ? <MyDiary/> : <Timeline/>}
      </Diary>
    )
}