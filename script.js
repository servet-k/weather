const key = "7d2c51851e51f80d638e48e1e8b79741";
const geo_key="67425e00bc61f295751263mgb6f0224";
   

const weather = async function (lat, lon, unit = "metric") {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${key}`);
        const jsonData = await response.json();
        
        const sunrise = new Date(jsonData.sys.sunrise * 1000)
        const sunset = new Date(jsonData.sys.sunset * 1000)


        document.querySelector(".left").innerText = "Temperature: " + jsonData.main.temp + "\u00B0" + "C" + `\n\n` + jsonData.weather[0].description;
        document.querySelector(".right").innerText = "Humidity: " + jsonData.main.humidity + " %" + `\n\n` + "pressure: " + jsonData.main.pressure;

        document.getElementById("sunrise").innerText = "sunrise: " + sunrise.toLocaleString();

        document.getElementById("sunset").innerText = "sunset: " + sunset.toLocaleString();
        
        const geo_response = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${geo_key}`);
        const geo_jsonData = await geo_response.json();
        //console.log(geo_jsonData);
        document.querySelector(".map").innerHTML =geo_jsonData.display_name 
        setInterval(() => {
            const time = new Date();
            const date = time.toDateString();
            const hour = time.toLocaleTimeString();
            document.getElementById("time").innerText = date + " " + hour;


        }, 1000)

    } catch (error) {
        console.log(error);

    }

}

const forecast = async function (lat, lon, unit = "metric") {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${key}`);
      const jsonData = await response.json();
    
      const forecastData = jsonData.list;
      //console.log(forecastData[4]);
      // Loop through the forecast data and get the weather data for each day
      for (let i = 0; i < forecastData.length; i += 8) {
        const dayData = forecastData[i];
       // const date = new Date(dayData.dt * 1000).toDateString();
       const date=dayData.dt_txt
        const temp = dayData.main.temp;
        const description = dayData.weather[0].description;
  
        // Update the webpage with the forecast data
        
        document.querySelector(`.day-${i}`).querySelector(".date").innerText = `Date: ${date}`;
        document.querySelector(`.day-${i}`).querySelector(".temp").innerText = `Temp: ${temp}\u00B0C`;
        document.querySelector(`.day-${i}`).querySelector(".description").innerText = `Description: ${description}`;
  
        // Update the webpage with the forecast data    
    }

    } catch (error) {
      console.log(error);
    }
  }
const place = async function (city) {
    try {

        const location = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
        const jsonloc = await location.json()
        let lat = jsonloc[0].lat;
        let lon = jsonloc[0].lon;
        console.log(lat, lon);
        document.getElementById("city").innerText = jsonloc[0].name;
        weather(lat, lon);
        forecast(lat, lon);
        
      

    } catch (error) {
        console.log(error);
    }
}

document.getElementById("loc").addEventListener('change', (e) => {
    place(e.target.value);

})

place("istanbul");

