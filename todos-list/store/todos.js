import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
Vue.use(Vuex)

export const state = () => ({
    list: []
  })

export const mutations = {
    add (state, text) {
        state.list.push({
            text: text,
            done: false
          })
    },
    remove (state, todo ) {
        state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle (state, todo) {
        todo.done = !todo.done
    },
    setTodos(state, payload) {
        payload.forEach(element => {
            state.list.push({
                text: element['title'],
                done: false
        })
            
        });
    }
}

export const actions = {
    async getTodos({ state, commit }) {
        try {
            let response = await axios.get('https://jsonplaceholder.typicode.com/todos').then((r) => {       
                commit('setTodos', r.data);
              })
        } catch (error) {
            commit('setTodos', []);
        }
    },
    async sendTodos(text, { state, commit }){
        try {
            let response = await axios.post('https://jsonplaceholder.typicode.com/todos',{
                    userId : 1,
                    id : 999999,
                    title : text,
                    completed : false
                }).then((r) => {       
              })
        } catch (error) {
            commit('setTodos', []);
        }
    }
}


new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})