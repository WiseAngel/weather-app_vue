import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {tokenGis, keyOWM} from '@/_token';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: {
      GISMETEO: {
        LINK: 'http://localhost:8010/proxy/v2/weather/current/',
        LINK_CITIES: 'http://localhost:8010/proxy/v2/search/cities/',
        PARAMS: tokenGis,
      },
      OWM: {
        LINK: 'http://api.openweathermap.org/data/2.5/weather?units=metric',
        KEY: keyOWM,
      },
    },
    bgi: '',
    city: '',
    cloudiness: 0,
    description: '',
    humidity: '',
    icon: '',
    precipitation: {
      type: 0
    },
    pressure: '',
    sunrise: '',
    sunset: '',
    temperature: {
      current: '',
      comfort: '',
    },
    wind: {
      directions: ['Ш', 'С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'],
      speed: '',
      direction: '',
      degree: '',
    },
    
    url: 'http://localhost:8010/proxy/v2/search/cities/?query=',
  },
  mutations: {
		foo(state) {
			const value = document.querySelector('.input').value.trim(); 
      axios.get(`${state.url}${value}`, state.API.GISMETEO.PARAMS)
        .then((response) => {
          console.log(response.data.response);
        })
        .catch((error) => {
          throw new Error(`ЧТО_ТО ПОШЛО НЕ ТАК!!! \n${error.message}`);
        });
    },

    buildURL({...state}, position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(state);
    },

  },
  actions: {
    foo({commit}) {
      commit('foo');
    },
   
    geolocation({commit}) {
      navigator.geolocation.getCurrentPosition(
        (position) => commit('buildURL', position), 
        (position) => commit('geoError', position)
      )},
    },
});
