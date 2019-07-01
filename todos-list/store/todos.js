import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

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
    let important = false, later = false, newText = text;
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
    add(state, text) {
        let { important, later, newText } = getTagsFromTextAndRemoveThem(text);
        state.list.push({
            id: state.list[state.list.length - 1].id + 1,
            userId: 1,
            title: newText,
            completed: false,
            important: important,
            later: later,
            isCurrentlyEdited: false,
            newTitle: ""
        });
    },
    remove(state, todo) {
        state.list.splice(state.list.indexOf(todo), 1);
    },
    toggle(state, todo) {
        todo.completed = !todo.completed;
    },
    toggleImportant(state, todo) {
        let index = state.list.indexOf(todo);
        state.list[index].important = !state.list[index].important;
        if (state.list[index].important)
            state.list[index].later = false;

    },
    toggleLater(state, todo) {
        let index = state.list.indexOf(todo);
        state.list[index].later = !state.list[index].later;
        if (state.list[index].later)
            state.list[index].important = false;
    },
    toggleEdit(state, todo) {
        let index = state.list.indexOf(todo);
        state.list[index].isCurrentlyEdited = !state.list[index].isCurrentlyEdited;
        state.list[index].newTitle = state.list[index].title;
    },
    editTitle(state, todo) {
        let index = state.list.indexOf(todo);
        state.list[index].title = state.list[index].newTitle;
        let { important, later, text } = getTagsFromTextAndRemoveThem(state.list[index].title);
        state.list[index].important = important;
        state.list[index].later = later;
        state.list[index].title = text;
        state.list[index].isCurrentlyEdited = false;
    },
    setTodos(state, payload) {
        payload.forEach(element => {
            state.list.push({
                id: element['id'],
                userId: element['userId'],
                title: element['title'],
                completed: element['completed'],
                important: false,
                later: false,
                isCurrentlyEdited: false,
                newTitle: ""
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
    async actionAddTodo({ state, commit }, payload) {
        try {
            await axios.post(API_URL, {
                userId: 1,
                id: state.list.length,
                title: payload,
                completed: false,
                important: false,
                later: false,
                newTitle: ""
            }).then(() => {
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
        try {
            await axios.put(API_URL + todo.id, {
                userId: todo.userId,
                id: todo.id,
                title: todo.title,
                completed: !todo.completed,
                important: todo.important,
                later: todo.later,
                newTitle: todo.newTitle
            }).then(() => {
                commit('toggle', todo);
            })
        }
        catch (error) {
            //we're still comiting since we know the backend wouldn't let us make PUT requests
            //remove this line when using a real backend allowing PUT requests :
            commit('toggle', todo)
            console.error("actionToggleTodo : " + error);
        }
    },
    async actionToggleImportantTodo({ state, commit }, todo) {
        let index = state.list.indexOf(todo);
        try {
            await axios.put(API_URL + todo.id, {
                userId: todo.userId,
                id: todo.id,
                title: newTitle,
                completed: todo.completed,
                important: !state.list[index].important,
                later: todo.later,
                newTitle: todo.newTitle
            }).then(() => {
                commit('toggleImportant', todo);
            });
        }
        catch (error) {
            //we're still comiting since we know the backend wouldn't let us make PUT requests
            //remove this line when using a real backend allowing PUT requests :
            commit('toggleImportant', todo)
            console.error("actionToggleImportantTodo : " + error);
        }
    },
    async actionToggleLaterTodo({ state, commit }, todo) {
        let index = state.list.indexOf(todo);
        try {
            await axios.put(API_URL + todo.id, {
                userId: todo.userId,
                id: todo.id,
                title: newTitle,
                completed: todo.completed,
                important: todo.important,
                later: !state.list[index].later,
                newTitle: todo.newTitle
            }).then(() => {
                commit('toggleLater', todo);
            });
        }
        catch (error) {
            //we're still comiting since we know the backend wouldn't let us make PUT requests
            //remove this line when using a real backend allowing PUT requests :
            commit('toggleLater', todo);
            console.error("actionToggleLaterTodo : " + error);
        }
    },
    async actionEditTodo({ state, commit }, todo) {
        console.log(todo.newTitle)
        try {
            await axios.put(API_URL + todo.id, {
                userId: todo.userId,
                id: todo.id,
                title: todo.newTitle,
                completed: todo.completed,
                important: todo.important,
                later: todo.later,
                newTitle: todo.newTitle
            }).then(() => {
                commit('editTitle', todo);
            });
        }
        catch (error) {
            //we're still comiting since we know the backend wouldn't let us make PUT requests
            //remove this line when using a real backend allowing PUT requests :
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