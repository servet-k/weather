var key="7d2c51851e51f80d638e48e1e8b79741";

const weather=async function (lat,lon,unit="metric") {
    try {
       
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${key}`);
    const jsonData= await response.json();
   
   const sunrise=new Date(jsonData.sys.sunrise*1000)
   const sunset=new Date(jsonData.sys.sunset*1000)
   const time= new Date();
   const date=time.toDateString();
   const hour=time.toLocaleTimeString();

   document.querySelector(".left").innerText="temperature: "+jsonData.main.temp+ "\u00B0"+"C" +`\n\n`+jsonData.weather[0].description;
   document.querySelector(".right").innerText="Humidity: "+jsonData.main.humidity+ " %" +`\n\n`+"pressure: "+jsonData.main.pressure; 
   
   document.getElementById("sunrise").innerText=   "sunrise: " +   sunrise.toLocaleString();
   
    document.getElementById("sunset").innerText=    "sunset: "  +   sunset.toLocaleString();
    document.getElementById("time").innerText=      "Time: "    +   date+" "+hour;
    
        
    } catch (error) {
        console.log(error);
        
    }
    
}

const place=async function(city){
    try {
       
        const location= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
        const jsonloc= await location.json()
        let     lat=    jsonloc[0].lat;
        let     lon=    jsonloc[0].lon;
        
        document.getElementById("city").innerText=jsonloc[0].name;
        weather(lat,lon);
        
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("loc").addEventListener('change',(e)=>{
    place(e.target.value);
    
})

place("istanbul");