<template>
  <div class="weather">
    <h4 class="city">{{ city }}</h4>
    <div class="main">
      <div class="main__inner main__inner_first">
        <span class="main__temperature">{{ temperature.current }}°</span>
        <img :src="icon" class="main__icon">
      </div>
      <div class="main__inner main__inner_second">
        <span class="main__description">{{ description }}</span>
        <span class="main__temperature_comfort">Ощущается как: {{ temperature.comfort }}°</span>
      </div>

    </div>
    <div class="info">
      <div class="info__inner info__sunrise">
        <img src="../assets/weather__icons_info/sunrise.svg" class="info__icon icon__sunrise">
        <span class="info__description">{{ sunrise }}</span>
      </div>
      <div class="info__inner info__sunset">
        <img src="../assets/weather__icons_info/sunset.svg" class="info__icon icon__sunset">
        <span class="info__description">{{ sunset }}</span>
      </div>
      <div class="info__inner info__humidity">
        <img src="../assets/weather__icons_info/humidity.svg" class="info__icon icon__humidity">
        <span class="info__description">{{ humidity }} %</span>
      </div>
      <div class="info__inner info__pressure">
        <img src="../assets/weather__icons_info/pressure.svg" class="info__icon icon__pressure">
        <span class="info__description">{{ pressure }} мм рт. ст.</span>
      </div>
      <div class="info__inner info__wind">
        <img src="../assets/weather__icons_info/wind.svg" class="info__icon icon__wind">
        <span class="info__description">{{ wind.speed }} м/с, {{ wind.direction }}</span>
        <img src="../assets/weather__icons_info/deg.svg" class="info__icon icon__deg">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {tokenGis, keyOWM} from '@/_token';

export default {
  name: 'Main',
  data() {
    return {
      API_GIS: 'http://localhost:8010/proxy/v2/weather/current/',
      API_GIS_CITIES: 'http://localhost:8010/proxy/v2/search/cities/',
      PARAMS_GIS: tokenGis,
      API_OWM: 'http://api.openweathermap.org/data/2.5/weather?units=metric',
      KEY_OWM: keyOWM,
      city: '',
      temperature: {
        current: '',
        comfort: '',
      },
      sunrise: '',
      sunset: '',
      pressure: '',
      humidity: '',
      wind: {
        directions: ['Ш', 'С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'],
        speed: '',
        direction: '',
        degree: ''
      },
      description: '',
      icon: '',
     
    };
  },
  methods: {
    getWeatherGis(url) {
      axios.get(url, this.PARAMS_GIS)
        .then((response) => {
          const res = response.data.response;

          this.temperature.current = (() => {
            const temp = Math.round(Number(res.temperature.air.C));
            return temp > 0 ? `+${temp}` : temp;
          })();
          this.temperature.comfort = (() => {
            const temp = Math.round(Number(res.temperature.comfort.C));
            return temp > 0 ? `+${temp}` : temp;
          })();
          this.pressure = res.pressure.mm_hg_atm;
          this.humidity = res.humidity.percent;
          this.wind.speed = res.wind.speed.m_s, 
          this.wind.direction = this.wind.directions[res.wind.direction.scale_8];
          this.wind.degree = res.wind.direction.degree;
          this.description = res.description.full;
          this.icon = require(`../assets/weather__icons_main/${res.icon}.svg`);
         
        })
        .catch((error) => {
          throw new Error(`Не удалось получить данные погоды от Gismeteo \n${error.message}`);
        });
    },

    getCity(url) {
      axios.get(url, this.PARAMS_GIS)
        .then((response) => {
          this.city = response.data.response[0].name;
        
        })
        .catch((error) => {
          throw new Error(`Не удалось получить название города от Gismeteo \n${error.message}`);
        });
    },

    getWeatherOWM(url) {
      axios.get(url)
        .then((response) => {
          const res = response.data;

          this.sunrise = new Date(res.sys.sunrise * 1000).toLocaleTimeString('ru-RU').slice(0, 5);
          this.sunset = new Date(res.sys.sunset * 1000).toLocaleTimeString('ru-RU').slice(0, 5);
      
        })
        .catch((error) => {
          throw new Error(`Не удалось получить данные погоды от OWM \n${error.message}`);
        });
    },

    buildURL(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.getWeatherGis(`${this.API_GIS}?latitude=${lat}&longitude=${lon}`);
      this.getCity(`${this.API_GIS_CITIES}?latitude=${lat}&longitude=${lon}&limit=1`);
      this.getWeatherOWM(`${this.API_OWM}&lat=${lat}&lon=${lon}${this.KEY_OWM}`);
    },

    geoError(error) {
      this.getWeatherGis(`${this.API_GIS}?latitude=0&longitude=0`);
      this.getCity(`${this.API_GIS_CITIES}?latitude=0&longitude=0&limit=1`);
      this.getWeatherOWM(`${this.API_OWM}&lat=0&lon=0${this.KEY_OWM}`);
      console.log(error);
    },

    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildURL, this.geoError, { enableHighAccuracy: true });
    },

    degree() {
      const img = document.querySelector('.icon__deg');
      
      img.style.transform = `rotate(${this.wind.degree}deg)`;
    },
  },
  beforeMount() {
    this.geolocation();
  },
  beforeUpdate() {
    this.degree(); 
  },
};
</script>

<style scoped lang="stylus">
.weather
  position relative
  padding 10px
  max-width 600px
  height 200px
  background url(../assets/bgs/1.jpg) no-repeat
  background-size cover
  color #fff
.city
  margin-top 0
  margin-bottom 10px
  font-size 20px
.main
  display flex
  flex-direction row
  &__icon
    width 44px
    height 44px
  &__inner
    display flex
    font-size 14px
    &_first 
      flex-direction row
      align-items center
    &_second
      flex-direction column
      justify-content space-around
  &__temperature
    font-size 40px
    line-height 1
.info
  display flex
  flex-direction row
  justify-content space-between
  &__inner
    display flex
    align-items center  
    font-size 14px 
  &__icon
    width 24px 
</style>
