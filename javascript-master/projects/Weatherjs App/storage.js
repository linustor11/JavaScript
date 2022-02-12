class Storage {
   constructor() {
      this.city;
      // this.state;
      this.defaultCity = 'Srinagar';
      // this.defaultState = 'US';
   }

   getLocationData() {
      if(localStorage.getItem('city') === null) {
         this.city = this.defaultCity;
      } else {
         this.city = localStorage.getItem('city');
      }

      // if(localStorage.getItem('state') === null) {
      //    this.state = this.defaultState;
      // } else {
      //    this.state = localStorage.getItem('state');
      // }

      return {
         city : this.city
         // state : this.state
      }


   }

   setLocationData(city) {
      localStorage.setItem('city', city);
   }

}