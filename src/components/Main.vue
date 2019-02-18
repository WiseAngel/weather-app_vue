<template>
  <div class="main">
    <div id="weather">
      <img :src="icon" class="icon"> {{ overcast }}
      <span class="temperature">{{ currentTemp }}°</span>
      <span id="temp-values">Min {{ minTemp }}° <br> Max {{ maxTemp }}°</span>
    </div>
    <div id="info">
      <img src="../assets/sunrise.svg" class="icon"> {{ sunrise }}
      <img src="../assets/sunset.svg" class="icon"> {{ sunset }}
      <img src="../assets/humidity.svg" class="icon"> {{ humidity }}
      <img src="../assets/pressure.svg" class="icon"> {{ pressure }}
      <img src="../assets/wind.svg" class="icon"> {{ wind }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Main',
  data() {
    return {
      currentTemp: '',
      minTemp: '',
      maxTemp: '',
      sunrise: '',
      sunset: '',
      pressure: '',
      humidity: '',
      wind: '',
      overcast: '',
      icon: '',
    };
  },
  methods: {
    getWeather() {
      const url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=b46555d11adddbc7266f70b191fda39f';
      // const API = 'http://api.openweathermap.org/data/2.5/weather?units=metric';
      // const KEY = '&APPID=b46555d11adddbc7266f70b191fda39f';

      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity;
          this.wind = `${response.data.wind.speed}m/s`;
          this.overcast = response.data.weather[0].description;
          this.icon = require(`../assets/${response.data.weather[0].icon.slice(0, 2)}.svg`);
          this.sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString('en-GB').slice(0, 4);
          this.sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString('en-GB').slice(0, 4);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.getWeather();
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
