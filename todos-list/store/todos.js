import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Vuex)
const API_URL="https://jsonplaceholder.typicode.com/todos/";
export const state = () => ({
    list: []
  })


export const mutations = {
    add (state, text) {
        let nbImportant = text.search("#important");
        let nbLater = text.search("#later");

        for(var i=1;i<nbImportant;i++)
            text = text.replace('#important','');
        for(var i=0;i<nbLater;i++)
            text = text.replace('#later','');

        if(nbLater >= 1)
            text = text + " #later";
        if(nbImportant >= 1)
            text = text + " #important";

        state.list.push({
            id : state.list[state.list.length-1].id + 1,
            userId : 1,
            title: text,
            completed: false,
            important : text.search("#important")>=1,
            later : text.search("#later")>=1,
            isCurrentlyEdited : false,
            newTitle : ""
          });
    },
    remove (state, todo ) {
        state.list.splice(state.list.indexOf(todo), 1);
    },
    toggle (state, todo) {
        todo.completed = !todo.completed;
    },
    toggleImportant(state,todo) {
        let index = state.list.indexOf(todo);
        let nbImportant = state.list[index].title.search("#important");

        if(nbImportant < 1){
            state.list[index].title = state.list[index].title + " #important";
            state.list[index].important = true;
            state.list[index].later = false;
            let nbLater = state.list[index].title.search("#later");
            for(var i=0;i<nbLater;i++)
                state.list[index].title = state.list[index].title.replace('#later','');
        }
        else{
            for(var i=0;i<nbImportant;i++)
                state.list[index].title = state.list[index].title.replace('#important','');
            state.list[index].important = false;
        }
        
        
    },
    toggleLater(state,todo) {
        let index = state.list.indexOf(todo);
        let nbLater = state.list[index].title.search("#later");

        if(nbLater < 1){
            state.list[index].title = state.list[index].title + " #later";
            state.list[index].later = true;
            state.list[index].important = false;
            let nbImportant = state.list[index].title.search("#important");
            for(var i=0;i<nbImportant;i++)
                state.list[index].title = state.list[index].title.replace('#important','');
        }
        else{
            for(var i=0;i<nbLater;i++)
                state.list[index].title = state.list[index].title.replace('#later','');
            state.list[index].later = false;
        }

       
    },
    toggleEdit(state,todo) {
        let index = state.list.indexOf(todo);
        state.list[index].isCurrentlyEdited = !state.list[index].isCurrentlyEdited;
        state.list[index].newTitle = state.list[index].title;
        let nbImportant = state.list[index].title.search("#important");
        let nbLater = state.list[index].title.search("#later");
        state.list[index].important = nbImportant >= 1;
        state.list[index].later = nbLater >= 1;
    },
    editTitle(state,todo) {
        let index = state.list.indexOf(todo);
        state.list[index].title = state.list[index].newTitle;

        let nbImportant = state.list[index].title.search("#important");
        let nbLater = state.list[index].title.search("#later");
        state.list[index].important = nbImportant >= 1;
        state.list[index].later = nbLater >= 1;

        for(var i=1;i<nbImportant;i++)
            state.list[index].title = state.list[index].title.replace('#important','');
        for(var i=0;i<nbLater;i++)
            state.list[index].title = state.list[index].title.replace('#later','');

        if(nbLater >= 1)
            state.list[index].title = state.list[index].title + " #later";
        if(nbImportant >= 1)
            state.list[index].title = state.list[index].title + " #important";

        state.list[index].isCurrentlyEdited = false;
    },
    setTodos(state, payload) {
        payload.forEach(element => {
            state.list.push({
                id : element['id'],
                userId : element['userId'],
                title : element['title'],
                completed : element['completed'],
                important : false,
                later : false,
                isCurrentlyEdited : false,
                newTitle : ""
            });
        });
    }
}

export const actions = {
    async actionGetTodos({ state, commit }) {
        try {
            await axios.get(API_URL).then((r) => {       
                commit('setTodos', r.data);
              })
        } catch (error) {
            console.error("actionGetTodos : " + error);
        }
    },
    async actionAddTodo({ state, commit }, payload){
        try {
            await axios.post(API_URL,{
                    userId : 1,
                    id : state.list.length,
                    title : payload,
                    completed : false,
                    important : false,
                    later : false,
                    newTitle : ""
                }).then(()=>{
                    commit('add', payload);
                })
        } 
        catch (error) {
            console.error("actionAddTodo : " + error);
        }
    },
    async actionDeleteTodo({ state, commit }, todo){
        try {
            await axios.delete(API_URL + todo.id).then(()=>{
                commit('remove', todo);
            })
        } 
        catch (error) {
            console.error("actionDeleteTodo : " + error);
        }
    },
    async actionToggleTodo({ state, commit }, todo){
        try {
            await axios.put(API_URL + todo.id,{
                    userId : todo.userId,
                    id : todo.id,
                    title : todo.title,
                    completed : !todo.completed,
                    important : todo.important,
                    later : todo.later,
                    newTitle : todo.newTitle
                }).then(()=>{
                    commit('toggle', todo);
                })
        } 
        catch (error) {
            //on commit qd meme car on sait que le backend ne peut pas faire de PUT et donc que cela va échouer
            //mais il faudrait supprimer cette ligne avec un vrai backend
            commit('toggle', todo)
            console.error("actionToggleTodo : " + error);
        }
    },
    async actionToggleImportantTodo({ state, commit }, todo){
        let imp = false
        let newTitle = ""
        if(imp = todo.title.search("#important")<1)
            newTitle = todo.title + " #important";
        else
            newTitle = todo.title.replace('#important','');

        try {
            await axios.put(API_URL + todo.id,{
                    userId : todo.userId,
                    id : todo.id,
                    title : newTitle,
                    completed : todo.completed,
                    important : imp,
                    later : todo.later,
                    newTitle : todo.newTitle
                }).then(()=>{
                    commit('toggleImportant', todo);
                });
        } 
        catch (error) {
            //on commit qd meme car on sait que le backend ne peut pas faire de PUT et donc que cela va échouer
            //mais il faudrait supprimer cette ligne avec un vrai backend
            commit('toggleImportant', todo)
            console.error("actionToggleImportantTodo : " + error);
        }
    },
    async actionToggleLaterTodo({ state, commit }, todo){
        let lat = false
        let newTitle = ""
        if(lat = todo.title.search("#later")<1)
            newTitle = todo.title + " #later";
        else
            newTitle = todo.title.replace('#later','');
            
        try {
            await axios.put(API_URL + todo.id,{
                    userId : todo.userId,
                    id : todo.id,
                    title : newTitle,
                    completed : todo.completed,
                    important : todo.important,
                    later : lat,
                    newTitle : todo.newTitle
                }).then(()=>{
                    commit('toggleLater', todo);
                });
        } 
        catch (error) {
            //on commit qd meme car on sait que le backend ne peut pas faire de PUT et donc que cela va échouer
            //mais il faudrait supprimer cette ligne avec un vrai backend
            commit('toggleLater', todo);
            console.error("actionToggleLaterTodo : " + error);
        }
    },
    async actionEditTodo({ state, commit }, todo){
        console.log(todo.newTitle)
        try {
            await axios.put(API_URL + todo.id,{
                    userId : todo.userId,
                    id : todo.id,
                    title : todo.newTitle,
                    completed : todo.completed,
                    important : todo.important,
                    later : todo.later,
                    newTitle : todo.newTitle
                }).then(()=>{
                    commit('editTitle', todo);
                });
        } 
        catch (error) {
            //on commit qd meme car on sait que le backend ne peut pas faire de PUT et donc que cela va échouer
            //mais il faudrait supprimer cette ligne avec un vrai backend
            commit('editTitle', todo);
            console.error("actionEditTodo : " + error);
        }
    },
}


new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})