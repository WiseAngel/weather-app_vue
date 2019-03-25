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
    position: {
      lat: 0,
      lon: 0,
    },
    API: 'http://api.openweathermap.org/data/2.5/weather?units=metric',
    KEY: '&lang=ru&APPID=b46555d11adddbc7266f70b191fda39f',
    FOO: '',
  },
  mutations: {
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
    // getWeather(state, url) {
    //   console.log('HELLLLLLLLLLLLLO');
    //   console.log(url);


    //   axios
    //     .get(url)
    //     .then((response) => {
    //       console.log(response);
    //       state.currentTemp = response.data.main.temp;
    //       state.minTemp = response.data.main.temp_min;
    //       state.maxTemp = response.data.main.temp_max;
    //       state.pressure = response.data.main.pressure;
    //       state.humidity = `${response.data.main.humidity}%`;
    //       state.wind = `${response.data.wind.speed}m/s`;
    //       state.overcast = response.data.weather[0].description;
    //       state.icon = require(`@/assets/${response.data.weather[0].icon.slice(0, 2)}.svg`);
    //       state.sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString('en-GB').slice(0, 5);
    //       state.sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString('en-GB').slice(0, 5);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // buildURL(state) {
    //   console.log('BURL');
    //   // console.log(position);
    //   console.log(state);

    //   const lat = state.position.coords.latitude;
    //   const lon = state.position.coords.longitude;
    //   console.log(lat, lon);

    //   return `${state.API}&lat=${lat}&lon=${lon}${state.KEY}`;
    // },

    // geoError(state, url) {
    //   console.log('geoError');
    //   console.log(url);

    //   return `${state.API}&lat=0&lon=0${state.KEY}`;
    // },

    // geolocation(state) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       // console.log(state);
    //       // console.log(position);

    //       state.position.lat = position.coords.latitude;
    //       state.position.lon = position.coords.longitude;
    //     },

    //     () => console.log('ВКЛЮЧИ ГЕО'),
    //   );
    // },

    buildURL(state) {
      // console.log('BURL');
      // console.log(position);
      // console.log(state);

      const { lat } = state.position;
      const { lon } = state.position;
      console.log(lat, lon, state.position);
      return `${state.API}&lat=${lat}&lon=${lon}${state.KEY}`;
    },

  },
  actions: {
    foo({ commit }) {
      commit('foo');
    },
    // getWeather({commit, state}, url) {
    //   commit('getWeather', url);
    // },
    // buildURL({commit, state}, position) {
    //   commit('buildURL', position);
    //   // const lat = position.coords.latitude;
    //   // const lon = position.coords.longitude;
    //   // commit('getWeather', `${state.API}&lat=${lat}&lon=${lon}${state.KEY}`);
    //   // console.log('BURL');
    // },
    // geoError({ commit, state }) {
    //   commit('getWeather', `${state.API}&lat=0&lon=0${state.KEY}`);
    // },

    getWeather({ state }, url) {
      // console.log('HELLLLLLLLLLLLLO');
      // console.log(state.FOO);

      axios
        .get(state.FOO)
        .then((response) => {
          // console.log(response);
          // console.log(url);
          state.currentTemp = response.data.main.temp;
          state.minTemp = response.data.main.temp_min;
          state.maxTemp = response.data.main.temp_max;
          state.pressure = response.data.main.pressure;
          state.humidity = `${response.data.main.humidity}%`;
          state.wind = `${response.data.wind.speed}m/s`;
          state.overcast = response.data.weather[0].description;
          state.icon = require(`@/assets/${response.data.weather[0].icon.slice(0, 2)}.svg`);
          state.sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString('en-GB').slice(0, 5);
          state.sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString('en-GB').slice(0, 5);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async buildURL({ commit, state }) {
      // console.log('BURL');
      // console.log(position);
      // console.log(state);

      const { lat } = state.position;
      const { lon } = state.position;
      console.log(lat, lon, state.position);

      // console.log(state.FOO);
      return state.FOO = `${state.API}&lat=${lat}&lon=${lon}${state.KEY}`;
      
    },

    geoError(state, url) {
      console.log('geoError');
      console.log(url);

      return `${state.API}&lat=0&lon=0${state.KEY}`;
    },

    async geolocation({commit, state}) {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(state);
          console.log(position);

          state.position.lon = position.coords.longitude;
          state.position.lat = position.coords.latitude;
        },

        () => console.log('ВКЛЮЧИ ГЕО'),
      );
    },

  },
  getters: {
    data(state) {
      return state;
    },
  },
});
