// import React from 'react';

// class Weather extends React.Component{
//     render() {
//         return(
//             <div>Hello</div>
//         )
//     }
// }

// export default Weather

export const getWeather = function() {
    return fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=10c2fd9d94a9a7243f2448919729437b')
        .then(res => res.json)
}