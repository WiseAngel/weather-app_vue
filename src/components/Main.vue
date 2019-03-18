<template>
  <div class="main">
    <div id="weather">
      <img :src="data.icon" class="icon"> {{ data.overcast }}
      <span class="temperature">{{ data.currentTemp }}°</span>
      <span id="temp-values">Min {{ data.minTemp }}° <br> Max {{ data.maxTemp }}°</span>
    </div>
    <div id="info">
      <img src="../assets/sunrise.svg" class="icon"> {{ data.sunrise }}
      <img src="../assets/sunset.svg" class="icon"> {{ data.sunset }}
      <img src="../assets/humidity.svg" class="icon"> {{ data.humidity }}
      <img src="../assets/pressure.svg" class="icon"> {{ data.pressure }}
      <img src="../assets/wind.svg" class="icon"> {{ data.wind }}
    </div>
    <button @click="foo">+++</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Main',
  // data() {
  //   return {
  //     currentTemp: '',
  //     minTemp: '',
  //     maxTemp: '',
  //     sunrise: '',
  //     sunset: '',
  //     pressure: '',
  //     humidity: '',
  //     wind: '',
  //     overcast: '',
  //     icon: '',
  //     position: '',
  //     API: 'http://api.openweathermap.org/data/2.5/weather?units=metric',
  //     KEY: '&lang=ru&APPID=b46555d11adddbc7266f70b191fda39f',
  //   };
  // },
  methods: {

    foo(){
      this.$store.dispatch('foo')
    },
    // getWeather(){
    //   this.$store.dispatch('getWeather')
    // },
    // buildURL(){
    //   this.$store.dispatch('buildURL')
    // },
    // geoError(){
    //   this.$store.dispatch('geoError')
    // },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // getWeather(url) {
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       console.log(response);
    //       this.currentTemp = response.data.main.temp;
    //       this.minTemp = response.data.main.temp_min;
    //       this.maxTemp = response.data.main.temp_max;
    //       this.pressure = response.data.main.pressure;
    //       this.humidity = `${response.data.main.humidity}%`;
    //       this.wind = `${response.data.wind.speed}m/s`;
    //       this.overcast = response.data.weather[0].description;
    //       this.icon = require(`../assets/${response.data.weather[0].icon.slice(0, 2)}.svg`);
    //       this.sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString('en-GB').slice(0, 4);
    //       this.sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString('en-GB').slice(0, 4);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // geolocation() {
    //   navigator.geolocation.getCurrentPosition(this.$store.dispatch('getWeather'), this.$store.dispatch('geoError'));
    //   // navigator.geolocation.getCurrentPosition(this.buildURL, this.geoError);
    // },
    // buildURL(position) {
    //   const lat = position.coords.latitude;
    //   const lon = position.coords.longitude;

    //   // this.getWeather(`${this.API}&lat=${lat}&lon=${lon}${this.KEY}`);
    //   this.$store.dispatch('getWeather');
    // },
    // geoError() {
    //   // this.getWeather(`${this.API}&lat=0&lon=0${this.KEY}`);
    // },
  },
  beforeMount() {
    this.$store.dispatch('geolocation');
    // this.geolocation();
  },
  computed: {
    data() {
      return this.$store.getters.data;
    },
    getWeather(){
      this.$store.dispatch('getWeather')
    },
     buildURL(){
      this.$store.dispatch('buildURL')
    },
    geoError(){
      this.$store.dispatch('geoError')
    },
  },
};
</script>

<style scoped lang="stylus">
#weather
  padding 15px
  vertical-align middle

.temperature
  font-family 'Vast Shadow', cursive
  font-size 40px
  vertical-align top
  position absolute
  left 80px

#temp-values
  text-align right
  text-justify distribute
  display block
  position relative
  top -60px

#info
  padding-left 20px
  position relative
  top -20px

.icon
  position inherit
  top 2px
  padding-left 8px
</style>
