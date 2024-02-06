import { useEffect, useState } from "react";



export default function Clock(){
    const ForClock=()=>{    
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours} : ${minutes}`
    }
    const [nowtime, setNowTime] = useState(ForClock());
    useEffect(() => {
        const interval = setInterval(() => setNowTime(ForClock()), 5000);
    
        return () => clearInterval(interval);
      }, []);
return(
<>{nowtime}</>
);
};
