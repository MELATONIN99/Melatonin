import { useEffect, useState } from "react";
import styled from "styled-components";


const WeatherWrapper = styled.div`
display: flex;
flex-direction: column;
text-align: center;
`

export default function Weather() {
    const API_KEY = process.env.REACT_APP_weatherApiKey;
    const [weatherData, setWeatherData] = useState({
        city: "",
        weather: "",
    });
    useEffect(() => {
function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.floor(data.main.temp);
            const weather = `${data.weather[0].main} / ${temperature}℃`
            const city = data.name;
            setWeatherData({
                weather:weather,
                city:city,
            });
    });



}
function onGeoError(){
    alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    },[API_KEY]);

return(
    <WeatherWrapper>
    <div>{weatherData.city}</div>
    <div>{weatherData.weather}</div>

    </WeatherWrapper>
)
}