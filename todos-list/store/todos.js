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
            title: text,
            completed: false
          })
    },
    remove (state, todo ) {
        state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle (state, todo) {
        todo.completed = !todo.completed
    },
    setTodos(state, payload) {
        payload.forEach(element => {
            state.list.push({
                id : element['id'],
                userId : element['userId'],
                title: element['title'],
                completed: false
        })
            
        });
    }
}

export const actions = {
    async actionGetTodos({ state, commit }) {
        try {
            let response = await axios.get('https://jsonplaceholder.typicode.com/todos').then((r) => {       
                commit('setTodos', r.data);
                return r.data[r.data.lenth -1];
              })
        } catch (error) {
        }
    },
    async actionAddTodo({ state, commit }, payload){
        try {
            let response = await axios.post('https://jsonplaceholder.typicode.com/todos',{
                    userId : 1,
                    id : state.list.lenght,
                    title : payload,
                    completed : false
                }).then((r)=>{
                    commit('add', payload)
                })
        } catch (error) {
        }
    },
    async actionDeleteTodo({ state, commit }, payload){
        try {
            console.log(state)
            console.log(commit)
            console.log(payload)
            let response = await axios.delete('https://jsonplaceholder.typicode.com/todos/'   + payload.id).then((r)=>{
                commit('remove', payload)
            })
        } catch (error) {
        }
    }
}


new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})