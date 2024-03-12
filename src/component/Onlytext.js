import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";


export default function OnlyText() {
    const [displayName, SetDisplayName] = useState("");
    const navigate = useNavigate();
    const user = auth.currentUser;
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (user == null) {
              navigate("/login");
          } else if (user !== null) {
            SetDisplayName(user.displayName);
            if (displayName !== null) {
              const text = displayName;
              const response = await fetch(`http://localhost:8080/art/${text}`);
              const data = await response.text();
              const textWithoutPreTags = data.replace(/<\/?pre>/g, '');
              console.log( textWithoutPreTags );
              document.getElementById('outUserName').innerHTML = data;
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [displayName, navigate, user]);
    return (
      <div>
        <div 
        id="userName"
        ></div>
        <p id="outUserName"></p>
      </div>
    )
    };
     