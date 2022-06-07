

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
}else {
alert('your browser not support')
}



function onSuccess(position){
    
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b58aad5b16c544679f3d9871099a3adc`)
    .then(response => response.json()).then(response =>{
        let allDetails = response.results[0].components;
        console.table(allDetails.city);
        checkWeather(allDetails.city)
        let {county, postcode, country} = allDetails;
    }).catch(()=>{
        button.innerText = "Something went wrong";
    });
}

function onError(error) {
    console.log(error);
}

function checkWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d3fce2b1754d7f87ca9096fb20f9011e`)
    .then(response => response.json()).then(response => {
        console.log(response.main.temp)
        const weatherSection = document.querySelector('.weatherSection').innerHTML = response.main.temp;
    })
}