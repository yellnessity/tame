import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

const endpoint = 'http://localhost:3000/';

export default new Vuex.Store({
  state: {
    animals: [],
    users: null,
    status: '',
    token: localStorage.getItem('token') || '',
    user: {
      name: localStorage.getItem('username') || '',
      id: localStorage.getItem('id') || ''
    },
    
  },
  getters: {
    ANIMAL: state => payload => {
      let result = state.animals
      if (result && payload) return state.animals.find(animal => animal.id === payload.id)
      else return result
    },
    USER: state => payload => {
      let result
      if (state.users && payload) result = state.users.find(user => user.id === payload.id)
      else result = state.users
      return result
    },
    AUTHSTATUS: state => state.status,
    IS_LOGGED_IN: state => !!state.token
  },
  mutations: {
    SET_ANIMALS: (state, payload) => {
      state.animals = payload;
    },
    SET_ANIMAL: (state, payload) => {
      state.animals.push(payload);
    },
    SET_USERS: (state, payload) => {
      state.users = payload;
    },
    AUTH_REQUEST: (state) => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: (state, payload) => {
      state.status = 'success'
      state.token = payload.token
      state.user = {
        name: payload.username,
        id: payload.id
      }
    },
    AUTH_ERROR: (state) => {
      state.status = 'error'
    },
    LOGOUT: (state) => {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    GET_ANIMALS: async (context) => {
      let {data} = await Axios.get(endpoint + 'animals/');
      context.commit('SET_ANIMALS', data);
    },
    GET_USERS: async (context) => {
      let {data} = await Axios.get(endpoint + 'users/');
      context.commit('SET_USERS', data);
    },
    ADD_ANIMAL: async (context, payload) => {
      console.log("add animal")
      let {data} = await Axios.post(endpoint + 'animals/', payload);
      context.commit('SET_ANIMAL', data);
    },
    SET_STAR: async (context, payload) => {
      let {data} = await Axios.put(endpoint+'empl_detail/'+payload.id+'/', payload);
      if (data.status == 200) {
        console.log(data);
      }
    },
    LOGIN(context, payload){
      return new Promise((resolve, reject) => {
        context.commit('AUTH_REQUEST')
        Axios({url: 'http://www.hrhelper.na4u.ru/api/login/', data: payload, method: 'POST' })
        .then(resp => {
          localStorage.setItem('token', resp.data.token)
          localStorage.setItem('username', resp.data.username)
          localStorage.setItem('id', resp.data.id)
          Axios.defaults.headers.common['Authorization'] = resp.data.token
          context.commit('AUTH_SUCCESS', resp.data)
          resolve(resp)
        })
        .catch(err => {
          context.commit('AUTH_ERROR')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    REGISTER(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('AUTH_REQUEST')
        Axios({url: 'http://www.hrhelper.na4u.ru/api/register/', data: payload, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.username
          localStorage.setItem('token', token)
          localStorage.setItem('username', user)
          Axios.defaults.headers.common['Authorization'] = token
          context.commit('AUTH_SUCCESS', token, user)
          resolve(resp)
        })
        .catch(err => {
          context.commit('AUTH_ERROR', err)
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          reject(err)
        })
      })
    },
    LOGOUT(context){
      return new Promise((resolve) => {
        context.commit('LOGOUT')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        delete Axios.defaults.headers.common['Authorization']
        resolve()
      })
    }

  }
})
