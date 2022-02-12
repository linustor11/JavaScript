// Init storage
const storage = new Storage();
// get storage data
const weatherLocation = storage.getLocationData();

// Init weather object
// const weather = new Weather('Boston'); // Hardcoded
const weather = new Weather(weatherLocation.city);

//Init UI object
const ui = new UI();

//Get weather on DOM Load
document.addEventListener('DOMContentLoaded', getWeather);

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
   const city = document.getElementById('city').value;

   // Change Location
   weather.changeLocation(city);

   // Get Location in LS
   storage.setLocationData(city);

   // Get and display weather
   getWeather();

   //close Modal
   $('#locModal').modal('hide');
});

//weather.changeLocation('Miami', 'FL');

function getWeather() {
   weather.getWeather()
      .then(results => {
         console.log(results);
         ui.paint(results);
      })
      .catch(err => console.log(err));  //This function returns promise from the weatherjs

}

