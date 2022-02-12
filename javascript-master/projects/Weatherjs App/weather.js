class Weather {
   constructor(city) {
      this.apiKey = ''; // enter key here of openweathermap===> far9878
      this.city = city;
   }

   //fetch weather from APi
   async getWeather() {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`);

      const responseData = await response.json();

      // return responseData.current_observation;
      return responseData;
      // This is gonna return promise
   }

   //Change weather location
   changeLocation(city) {
      this.city = city;

   }
}
