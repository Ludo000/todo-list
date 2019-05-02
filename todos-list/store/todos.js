import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

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
    remove (state, { todo }) {
        state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle (state, todo) {
        todo.done = !todo.done
    }
}


new Vuex.Store({
    state: () => ({
        counter: 0,
        apiUrl: 'https://jsonplaceholder.typicode.com/todos'
    }),
    mutations: {
        increment (state) {
            state.counter++
        }
    },
    modules: {
        todos: {
            namespaced: true,
            state: () => ({
            list: []
            }),
            mutations: {
                setTodos(state, payload) {
                    state.list = payload;
                },
                add (state, { text }) {
                    state.list.push({
                    text,
                    done: false
                    })
                },
                remove (state, { todo }) {
                    state.list.splice(state.list.indexOf(todo), 1)
                },
                toggle (state, { todo }) {
                    todo.done = !todo.done
                }
            },
            actions: {
                async getTodos({ state, commit }) {
                    try {
                        let response = await axios.get(`${state.apiUrl}`)
                        commit('setTodos', response.data.hits);
                    } catch (error) {
                        commit('setTodos', []);
                    }
                }
            }
        }
    
    }
})