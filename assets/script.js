var WeatherKey = "7ec2e99ac6eb1f12ce82f154579d93e0"

// var SearchValue = document.querySelector('Search-value');
 var userFormEl = document.querySelector('#user-form');
var container = document.querySelector('.columns')

function handleSearchFormSubmit(event) {
  event.preventDefault();

  

  var searchInputVal = document.querySelector('#Search-value').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
displaysearch();
  getcitydata(searchInputVal);
  fetchWeatherForecast(searchInputVal);
}

function getcitydata(cityName) {
var geoapi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WeatherKey}`;
fetch(geoapi)
.then(function(response) {
  // Check if the request was successful
  if (response.ok) {
    // Parse the response data as JSON
    return response.json();
  } else {
    throw new Error('Error: ' + response.status);
  }
})
.then(function(data) {
  // Process the retrieved data
  console.log(data);
  console.log(data.main.temp);
  console.log(data.weather.icon)

  var currentWeather = data;

  var currentDate = dayjs().format(" (MM/DD/YYYY)");

  var currentTemp = currentWeather.main.temp;
  var currentWind = currentWeather.wind.speed;
  var currentHumidity = currentWeather.main.humidity;
  var icon = currentWeather.weather.icon;

   var fahrenheit = (currentTemp - 273.5) * 9/5 +32;
   var rounded = Math.round(fahrenheit * 10) / 10;

  var bigColumn = document.getElementById('big-display');
  bigColumn.innerHTML = `
  <h2> ${cityName} ${currentDate} </h2>
  <p>Temp: ${rounded}  °F</p>
  <p>Wind: ${currentWind} m/s</p>
  <p>Humidity: ${currentHumidity}%</p>
  <p> ${icon}</p>
  `;
})}
// Function to fetch 5-day weather forecast data
function fetchWeatherForecast(cityName) {
  // Construct the API URL with the provided parameters
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${WeatherKey}`;

  // Make the API request using fetch()
  fetch(apiUrl)
    .then(function(response) {
      // Check if the request was successful
      if (response.ok) {
        // Parse the response data as JSON
        // displaydata(forecastList);

        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then(function(data) {
      // Process the retrieved data
      console.log(data);

      // Extract the relevant information from the data
      var forecastList = data.list;

      // Loop through the forecast list
      for (var i = 0; i < forecastList.length; i++) {
        var forecast = forecastList[i];

        // Extract the temperature, wind speed, and humidity
        var temperature = forecast.main.temp;
        var windSpeed = forecast.wind.speed;
        var humidity = forecast.main.humidity;

        // Display the information
        console.log('Temperature:', temperature);
        console.log('Wind Speed:', windSpeed);
        console.log('Humidity:', humidity);

        var columnId = `column${i + 1}`;
        var column = document.getElementById(columnId);
        column.innerHTML = `
          <h2>Day ${i + 1} Forecast</h2>
          <p>Temp: ${temperature} K</p>
          <p>Wind: ${windSpeed} m/s</p>
          <p>Humidity: ${humidity}%</p>
        `;
      }
    })
    .catch(function(error) {
      // Handle any errors that occur during the request
      console.log(error);
    });
}


function displaysearch() {
  var searchInputVal = document.querySelector('#Search-value').value;
  localStorage.setItem('searched', JSON.stringify(searchInputVal));

  for ( var i = 0; i < localStorage.length; i++) {
    var storedSearch = localStorage.getItem(searchInputVal);
    var searchList = document.getElementById('myList');
    searchList.innerHTML = `
    <li>${storedSearch}</li>
    `;
  }
}





userFormEl.addEventListener('submit', handleSearchFormSubmit);