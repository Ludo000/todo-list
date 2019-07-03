import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Todo from '../model/Todo';

Vue.use(Vuetify, {
    iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
});
Vue.use(Vuex);
const API_URL = "https://jsonplaceholder.typicode.com/todos/";
export const state = () => ({
    list: []
})

/* getTagsFromTextAndRemoveThem
Update #important and #later state based on the input text content.
Remove all '#important' and '#later' substrings from the input text.

#Input : 
text : a string which may containing '#important' or '#later' substrings
#Output : 
important : a boolean wich is true if the text contains at least one '#important'
later : a boolean wich is true if the text contains at least one '#later'
newText : the input string removed from all the #important' or '#later' substrings
*/
var getTagsFromTextAndRemoveThem = (text) => {
    let important = false, later = false;
    let newText = text;
    let nbImportant = text.search("#important");
    let nbLater = text.search("#later");

    for (var i = 0; i < nbImportant; i++)
        newText = newText.replace('#important', '');
    for (var i = 0; i < nbLater; i++)
        newText = newText.replace('#later', '');

    if (!(important = nbImportant >= 1)) {
        later = nbLater >= 1;
    }
    return { important, later, newText };
};

export const mutations = {
    add(state, payload) {
        let { important, later, newText } = getTagsFromTextAndRemoveThem(payload);
        state.list.push(
            new Todo(
                state.list[state.list.length - 1].id + 1,
                1,
                newText,
                false,
                important,
                later,
                false,
                ""
            )
        );
    },
    remove(state, todo) {
        state.list.splice(state.list.indexOf(todo), 1);
    },
    update(state, todo) {
        let index = state.list.indexOf(todo);
        state.list[index] = todo;
    },
    toggleEdit(state, todo) {
        let index = state.list.indexOf(todo);
        todo.isCurrentlyEdited = !todo.isCurrentlyEdited;
        state.list[index] = todo;
    },
    editTitle(state, todo) {
        let index = state.list.indexOf(todo);
        let { important, later, text } = getTagsFromTextAndRemoveThem(state.list[index].newTitle);
        state.list[index].important = important;
        state.list[index].later = later;
        state.list[index].title = text;
        state.list[index].isCurrentlyEdited = false;
    },
    setTodos(state, payload) {
        payload.forEach(element => {
            state.list.push(
                new Todo(element['id'], element['userId'], element['title'], element['completed'], false, false, false, "")
            );
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
    async actionAddTodo({ state, commit }, payload) {
        try {
            await axios.post(API_URL,
                new Todo(
                    state.list.length,
                    1,
                    payload,
                    false,
                    false,
                    false,
                    false,
                    ""
                )
            ).then(() => {
                commit('add', payload);
            })
        }
        catch (error) {
            console.error("actionAddTodo : " + error);
        }
    },
    async actionDeleteTodo({ state, commit }, todo) {
        try {
            await axios.delete(API_URL + todo.id).then(() => {
                commit('remove', todo);
            })
        }
        catch (error) {
            console.error("actionDeleteTodo : " + error);
        }
    },
    async actionToggleTodo({ state, commit }, todo) {
        let completed = !todo.completed;
        let isCurrentlyEdited = false;
        try {
            await axios
                .put(API_URL + todo.id, new Todo(
                    todo.id,
                    todo.userId,
                    todo.title,
                    completed,
                    todo.important,
                    todo.later,
                    isCurrentlyEdited,
                    todo.newTitle
                ))
                .then(() => {
                    todo.completed = completed;
                    todo.isCurrentlyEdited = isCurrentlyEdited;
                    commit('update', todo);
                })
        }
        catch (error) {
            //we're still comiting since we know the backend wouldn't let us make PUT requests
            //remove this line when using a real backend allowing PUT requests :
            commit('update', newTodo)
            console.error("actionToggleTodo : " + error);
        }
    },
    async actionToggleImportantTodo({ state, commit }, todo) {
        let important = !todo.important;
        let later = todo.later;
        if (important)
            later = false;
        try {
            await axios
                .put(API_URL + todo.id, new Todo(
                    todo.id,
                    todo.userId,
                    todo.title,
                    todo.completed,
                    important,
                    later,
                    false,
                    todo.newTitle
                ))
                .then(() => {
                    todo.important = important;
                    todo.later = later;
                    commit('update', todo);
                });
        }
        catch (error) {
            //we're still comiting since we know the backend wouldn't let us make PUT requests
            //remove this line when using a real backend allowing PUT requests :
            commit('update', todo)
            console.error("actionToggleImportantTodo : " + error);
        }
    },
    async actionToggleLaterTodo({ state, commit }, todo) {
        let later = !todo.later;
        let important = todo.important;
        if (later)
            important = false;
        try {
            await axios
                .put(API_URL + todo.id, new Todo(
                    todo.id,
                    todo.userId,
                    todo.title,
                    todo.completed,
                    important,
                    later,
                    false,
                    todo.newTitle
                ))
                .then(() => {
                    todo.important = important;
                    todo.later = later;
                    commit('update', todo);
                });
        }
        catch (error) {
            //we're still comiting since we know the backend wouldn't let us make PUT requests
            //remove this line when using a real backend allowing PUT requests :
            commit('update', todo);
            console.error("actionToggleLaterTodo : " + error);
        }
    },
    async actionEditTodo({ state, commit }, todo) {
        let title = todo.newTitle;
        try {
            await axios.put(API_URL + todo.id, new Todo(
                todo.id,
                todo.userId,
                title,
                todo.completed,
                important,
                later,
                false,
                todo.newTitle
            ))
                .then(() => {
                    todo.title = title;
                    commit('toggleEdit', todo);
                });
        }
        catch (error) {
            //we're still comiting since we know the backend wouldn't let us make PUT requests
            //remove this line when using a real backend allowing PUT requests :
            commit('toggleEdit', todo);
            console.error("actionEditTodo : " + error);
        }
    },
}


new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})