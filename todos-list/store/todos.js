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
            id : state.list.length+1,
            userId : 1,
            title: text,
            completed: false,
            important : text.search("#important")>=1,
            later : text.search("#later")>=1
          })
          console.log(state.list[state.list.length-1])
    },
    remove (state, todo ) {
        state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle (state, todo) {
        todo.completed = !todo.completed
    },
    toggleImportant(state,todo) {
        let index = state.list.indexOf(todo);
        if(state.list[index].important = state.list[index].title.search("#important") < 1)
            state.list[index].title = state.list[index].title + " #important"
        else
            state.list[index].title = state.list[index].title.replace('#important','');
    },
    toggleLater(state,todo) {
        let index = state.list.indexOf(todo);
        if(state.list[index].later = state.list[index].title.search("#later") < 1)
            state.list[index].title = state.list[index].title + " #later"
        else
            state.list[index].title = state.list[index].title.replace('#later','');
    },
    setTodos(state, payload) {
        payload.forEach(element => {
            state.list.push({
                id : element['id'],
                userId : element['userId'],
                title : element['title'],
                completed : false,
                important : false,
                later : false
        })
            
        });
    }
}

export const actions = {
    async actionGetTodos({ state, commit }) {
        try {
            await axios.get('https://jsonplaceholder.typicode.com/todos').then((r) => {       
                commit('setTodos', r.data);
              })
        } catch (error) {
            console.error("actionGetTodos : " + error);
        }
    },
    async actionAddTodo({ state, commit }, payload){
        try {
            await axios.post('https://jsonplaceholder.typicode.com/todos',{
                    userId : 1,
                    id : state.list.length,
                    title : payload,
                    completed : false
                }).then(()=>{
                    commit('add', payload)
                })
        } catch (error) {
            console.error("actionAddTodo : " + error);
        }
    },
    async actionDeleteTodo({ state, commit }, todo){
        try {
            await axios.delete('https://jsonplaceholder.typicode.com/todos/' + todo.id).then(()=>{
                commit('remove', todo)
            })
        } catch (error) {
            console.error("actionDeleteTodo : " + error);
        }
    },
    async actionToggleTodo({ state, commit }, todo){
        try {
            await axios.put('https://jsonplaceholder.typicode.com/todos/' + todo.id,{
                    userId : todo.userId,
                    id : todo.id,
                    title : todo.title,
                    completed : !todo.completed,
                    important : todo.important,
                    later : todo.later
                }).then(()=>{
                    commit('toggle', todo)
                })
        } catch (error) {
            console.error("actionToggleTodo : " + error);
        }
    },
    async actionToggleImportantTodo({ state, commit }, todo){
        let imp = false
        let newTitle = ""
        if(imp = todo.title.search("#important")<1)
            newTitle = todo.title + " #important"
        else
            newTitle = todo.title.replace('#important','');

        try {
            await axios.put('https://jsonplaceholder.typicode.com/todos/' + todo.id,{
                    userId : todo.userId,
                    id : todo.id,
                    title : newTitle,
                    completed : todo.completed,
                    important : imp,
                    later : todo.later
                }).then(()=>{
                    commit('toggleImportant', todo)
                })
        } catch (error) {
            console.error("actionToggleImportantTodo : " + error);
        }
    },
    async actionToggleLaterTodo({ state, commit }, todo){
        let lat = false
        let newTitle = ""
        if(lat = todo.title.search("#later")<1)
            newTitle = todo.title + " #later"
        else
            newTitle = todo.title.replace('#later','');
            
        try {
            await axios.put('https://jsonplaceholder.typicode.com/todos/' + todo.id,{
                    userId : todo.userId,
                    id : todo.id,
                    title : newTitle,
                    completed : todo.completed,
                    important : todo.important,
                    later : lat
                }).then(()=>{
                    commit('toggleLater', todo)
                })
        } catch (error) {
            console.error("actionToggleLaterTodo : " + error);
        }
    }
}


new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})