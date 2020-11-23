// Simon Brandoné
// Skapar element och designerar den.
let input = document.querySelector('.textinput');
let main = document.querySelector('#citynametext');
let temp = document.querySelector('.Temperatur');
let desc = document.querySelector('.Description');
let speed = document.querySelector('.Windspeed');
let humi = document.querySelector('.Humidity');
let locationIcon = document.querySelector('.weather-icon');
let button = document.querySelector('.submit');
let color = document.querySelector('.varme');

// Skapar en funktion
button.addEventListener('click', function(name) {
// Hämtar data från api
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=9cd463c43556c1d64d3633ddc9a40e30&units=metric')
// Kollar svaret från api
.then(response => {
    console.log(response);

    //Skickar vidare svar vid statuskod 200 - 299
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }

    // Om error 404 kommer upp skicka detta error meddelande
    else if (response.status === 404) {
      throw "Staden kunde inte hittas";
    }

    // Om error 401 kommer upp skicka detta error meddelande
    else if (response.status === 401) {
      throw "Något gick fel";
    }
 })
//  Simon Brandoné
 .then(data =>  {
  // Skapar element och ger dem den data från svaret av api
  let tempValue = data['main']['temp'];
  let nameValue = data['name'];
  let descValue = data['weather'][0]['description'];
  let humiValue = data['main']['humidity'];
  let windSpeed = data['wind']['speed'];
  let {icon} = data.weather[0];

  // Ger ut info jag fått från api till html så man får upp info på hemsidan
  main.innerHTML = nameValue;
  desc.innerHTML = "Description: "+descValue;
  temp.innerHTML = "Temperatur: "+tempValue;
  humi.innerHTML = "Luftfuktighet: "+humiValue;
  speed.innerHTML = "Vindhastighet: "+windSpeed;
  locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
  input.value ="";

  // Skapar en if loop för att ändra färg på ruta beroende på temperatur
  // Om temp är mindre än 10 gör detta
  if(tempValue < 10 ){
    color.style.backgroundColor = '#17d4fc';
}

  // om temp är mer eller lika med 10 och mindre än 20 gör detta
  else if(tempValue >= 10 && tempValue < 20){
    color.style.backgroundColor = '#d39963';
}

  // om temp är lika med eller mer än 20 gör detta
  else if(tempValue >= 20 ){
    color.style.backgroundColor = '#f70404';
  }
})
// Fångar upp om det vart något error och skickar en alert
.catch(function (error) {
    alert(error);
});
})
//  Simon Brandoné