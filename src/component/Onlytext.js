import { useState } from "react";


export default function OnlyText() {
    const [art, setArt] = useState("");
    // const onChange = (event) => setArt(event.target.value);
    const onSubmit = (event) => {
      event.preventDefault();
      if(art ===""){
        return;
      }
      setArt("");
    };
  
    const onClick = () => {
      const text = document.getElementById('art').value
        fetch(`http://localhost:8080/art/${text}`)
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          document.getElementById('outtext').innerHTML = data;
        });
  
      };
  
    console.log(art);
    return (
      <div>
      <form onSubmit={onSubmit}>
      <input
      id="art"
      // onChange={onChange}
      // value={art}
      text="text"
      placeholder="Wirte something!"
      ></input>
      <button onClick={onClick}>입력</button>
      </form>
      <p id="outtext">
      </p>
      </div>
    )
    };
