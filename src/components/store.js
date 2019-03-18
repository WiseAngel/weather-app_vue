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


    // getCity({state}, url) {
    //   axios.get(url, state.API.GISMETEO.PARAMS)
    //     .then((response) => {
    //       state.city = response.data.response[0].name;
    //     })
    //     .catch((error) => {
    //       throw new Error(`Не удалось получить название города от Gismeteo \n${error.message}`);
    //     });
    // },

    getWeatherGis() {
      // axios.get(url, state.API.GISMETEO.PARAMS)
      //   .then((response) => {
      //     const res = response.data.response;
      //     console.log(res);
      //     state.temperature.current = state.temperatureFormat(res.temperature.air.C);
      //     state.temperature.comfort = state.temperatureFormat(res.temperature.comfort.C);
      //     state.pressure = res.pressure.mm_hg_atm;
      //     state.humidity = res.humidity.percent;
      //     state.wind.speed = res.wind.speed.m_s, 
      //     state.wind.direction = state.wind.directions[res.wind.direction.scale_8];
      //     state.wind.degree = res.wind.direction.degree;
      //     state.description = res.description.full;
      //     state.icon = require(`@/assets/weather__icons_main/${res.icon}.svg`);
      //     state.cloudiness = res.cloudiness.type;
      //     state.precipitation.type = res.precipitation.type;
      //   })
      //   .catch((error) => {
      //     throw new Error(`Не удалось получить данные погоды от Gismeteo \n${error.message}`);
      //   });
      console.log('url');
    },

    buildURL({...state}, position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // console.log(`${state.API.GISMETEO.LINK}?latitude=${lat}&longitude=${lon}`);
      console.log(state);
      // let url = `${state.API.GISMETEO.LINK}?latitude=${lat}&longitude=${lon}`;
      // return url;
      // commit('getWeatherGis', `${state.API.GISMETEO.LINK}?latitude=${lat}&longitude=${lon}`);
      // commit('getCity', (`${state.API.GISMETEO.LINK_CITIES}?latitude=${lat}&longitude=${lon}&limit=1`));
      // commit('getWeatherOWM', (`${state.API.OWM.LINK}&lat=${lat}&lon=${lon}${state.API.OWM.KEY}`));
    },

    // geolocation({commit}, position) {
    //   navigator.geolocation.getCurrentPosition(buildURL, geoError);
    // },

  },
  actions: {
    foo({commit}) {
      commit('foo');
    },
    // getWeatherGis({commit}){
    //   commit('getWeatherGis', `${state.API.GISMETEO.LINK}?latitude=${lat}&longitude=${lon}`);
    // },
     buildURL({commit, state}) {
      // commit('buildURL', state);
      let url = `${state.API.GISMETEO.LINK}?latitude=${lat}&longitude=${lon}`;
      // try {
      //    commit('getWeatherGis');
      // } catch (error) {
      //   console.log('NEEEE');
        
      // }
      
    },
    geolocation({commit}) {
      navigator.geolocation.getCurrentPosition(
        (position) => commit('buildURL', position), 
        (position) => commit('geoError', position)
      )},

      getWeatherGis({commit}) {
        // axios.get(url, state.API.GISMETEO.PARAMS)
        //   .then((response) => {
        //     const res = response.data.response;
        //     console.log(res);
        //     state.temperature.current = state.temperatureFormat(res.temperature.air.C);
        //     state.temperature.comfort = state.temperatureFormat(res.temperature.comfort.C);
        //     state.pressure = res.pressure.mm_hg_atm;
        //     state.humidity = res.humidity.percent;
        //     state.wind.speed = res.wind.speed.m_s, 
        //     state.wind.direction = state.wind.directions[res.wind.direction.scale_8];
        //     state.wind.degree = res.wind.direction.degree;
        //     state.description = res.description.full;
        //     state.icon = require(`@/assets/weather__icons_main/${res.icon}.svg`);
        //     state.cloudiness = res.cloudiness.type;
        //     state.precipitation.type = res.precipitation.type;
        //   })
        //   .catch((error) => {
        //     throw new Error(`Не удалось получить данные погоды от Gismeteo \n${error.message}`);
        //   });
        commit('getWeatherGis');
      },
  
    },
});
