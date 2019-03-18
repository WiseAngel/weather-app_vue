import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    position: '',
    API: 'http://api.openweathermap.org/data/2.5/weather?units=metric',
    KEY: '&lang=ru&APPID=b46555d11adddbc7266f70b191fda39f',
  },
  mutations: {
    getWeather(state, url) {
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          state.currentTemp = response.data.main.temp;
          state.minTemp = response.data.main.temp_min;
          state.maxTemp = response.data.main.temp_max;
          state.pressure = response.data.main.pressure;
          state.humidity = `${response.data.main.humidity}%`;
          state.wind = `${response.data.wind.speed}m/s`;
          state.overcast = response.data.weather[0].description;
          state.icon = require(`@/assets/${response.data.weather[0].icon.slice(0, 2)}.svg`);
          state.sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString('en-GB').slice(0, 4);
          state.sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString('en-GB').slice(0, 4);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // buildURL(state, position) {
    //   const lat = position.coords.latitude;
    //   const lon = position.coords.longitude;

    //   // this.getWeather(`${state.API}&lat=${lat}&lon=${lon}${state.KEY}`);
    //   this.$store.dispatch('getWeather', `${state.API}&lat=${lat}&lon=${lon}${state.KEY}`);
    // },

    // geoError(state) {
    //   this.$store.dispatch('getWeather', `${state.API}&lat=0&lon=0${state.KEY}`);
    // },

    // geolocation() {
    //     navigator.geolocation.getCurrentPosition(this.buildURL, this.geoError);
    //   },

    foo(state) {
      axios
        .get(`${state.API}&lat=0&lon=0${state.KEY}`)
        .then((response) => {
          console.log(response);
          console.log(state);
        })
        .catch((error) => {
          console.log(`ЧТО-ТО НЕ ТАК!!! ${error}`);
        });
    },
  },
  actions: {
    foo({commit}) {
      commit('foo');
    },
    getWeather({commit}) {
      commit('getWeather', "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=47.5088216&lon=42.1633261&lang=ru&APPID=b46555d11adddbc7266f70b191fda39f");
    },
    // buildURL({commit}) {
    //   commit('buildURL');
    // },
    // geoError({commit}) {
    //   commit('geoError');
    // },
    // geolocation({commit}) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => commit('buildURL', position), 
    //     (position) => commit('geoError', position)
    //   )},
  },
  getters: {
    data(state) {
      return state
    }
  }
});
