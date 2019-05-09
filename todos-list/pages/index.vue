<template>
  <v-container grid-list-lg>
    <v-layout align-center justify-center row>
        <v-flex xs10 class="big-section">
          <v-flex xs12 class="text-xs-center title my-1">À faire</v-flex>
            <input type="text" class="todos-input" placeholder="Entrez ici une nouvelle chose à faire" @keyup.enter="addTodo"/>
            <br/><br/>
            <v-container grid-list-md text-xs-center id="sticky" class="sticky-container">
              <v-layout wrap>
              <div v-for="todo in todos" :key="todo.id" class="todo-container">
                <v-flex v-if="!todo.completed" :class="todo.important ? 'important-todo' : ''" >
                  <v-card  color="#ffe260" :class="todo.later ? 'later-todo' : ''" >
                    <v-card-actions>
                      <v-btn flat color="red" @click="toggleEdit(todo)" :class="todo.isCurrentlyEdited ? 'active-btn' : ''">📝</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn flat color="red" @click="actionDeleteTodo(todo)">✖</v-btn>
                    </v-card-actions>
                    <p class="todo-title" v-if="!todo.isCurrentlyEdited">{{ todo.id }}. {{ todo.title }}</p>
                    <input type="text" v-bind:value="todo.title" v-on:input="todo.newTitle = $event.target.value" v-if="todo.isCurrentlyEdited" class="todos-input"/>
                    <v-btn flat color="red"  v-if="todo.isCurrentlyEdited" @click="actionEditTodo(todo)">Valider</v-btn>
                    <v-btn flat color="red"  v-if="todo.isCurrentlyEdited" @click="toggleEdit(todo)">Annuler</v-btn>
                    <v-card-actions>
                      <v-btn flat color="green" @click="actionToggleImportantTodo(todo)" :class="todo.important ? 'active-btn' : ''" >!</v-btn>
                      <v-btn flat color="green" @click="actionToggleLaterTodo(todo)" :class="todo.later ? 'active-btn' : ''" >🕐</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn flat color="green" @click="actionToggleTodo(todo)">✔</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                </div>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex xs2 class="big-section big-section-done">
            <v-flex xs12 class="text-xs-center title my-1">Fait</v-flex>
              <v-container grid-list-md text-xs-center class="sticky-container dones-container">
                <v-layout wrap>
                  <div v-for="todo in todos" :key="todo.id"  class="done-container">
                    <v-flex v-if="todo.completed" :class="todo.important ? 'important-todo' : ''">
                      <v-card  color="#ffe260" :class="todo.later ? 'later-todo' : ''" >
                        <v-card-actions>
                          <v-btn flat color="red" @click="toggleEdit(todo)" :class="todo.isCurrentlyEdited ? 'active-btn' : ''">📝</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn flat color="red" @click="actionDeleteTodo(todo)" >✖</v-btn>
                        </v-card-actions>
                        <p class="todo-title" v-if="!todo.isCurrentlyEdited">{{ todo.id }}. {{ todo.title }}</p>
                        <input type="text" v-bind:value="todo.title" v-on:input="todo.newTitle = $event.target.value" v-if="todo.isCurrentlyEdited" class="todos-input"/>
                        <v-btn flat color="red"  v-if="todo.isCurrentlyEdited" @click="actionEditTodo(todo)">Valider</v-btn>
                        <v-btn flat color="red"  v-if="todo.isCurrentlyEdited" @click="toggleEdit(todo)">Annuler</v-btn>
                        <v-card-actions>
                          <v-btn flat color="green" @click="actionToggleImportantTodo(todo)" :class="todo.important ? 'active-btn' : ''">!</v-btn>
                          <v-btn flat color="green" @click="actionToggleLaterTodo(todo)" :class="todo.later ? 'active-btn' : ''">🕐</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn flat color="orange" @click="actionToggleTodo(todo)">⮌</v-btn>
                        </v-card-actions>
                     </v-card>
                   </v-flex>
                </div>
              </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapMutations, mapActions } from 'vuex'

export default {

  mounted : function() {
    this.$store.dispatch('todos/actionGetTodos')
    
  },
  computed: {
    todos () {
      return this.$store.state.todos.list
    }

  },
  methods: {
    addTodo (e) {
      this.actionAddTodo(e.target.value)
      e.target.value = ''

      //scroll down
      var container = this.$el.querySelector("#sticky");
      container.scrollTop = container.scrollHeight;
    },
    ...mapMutations({
      toggle: 'todos/toggle',
      remove : 'todos/remove',
      toggleEdit : 'todos/toggleEdit'
    }),
    ...mapActions({
     actionGetTodos: 'todos/actionGetTodos',
     actionAddTodo: 'todos/actionAddTodo',
     actionDeleteTodo: 'todos/actionDeleteTodo',
     actionToggleTodo: 'todos/actionToggleTodo',
     actionToggleImportantTodo: 'todos/actionToggleImportantTodo',
     actionToggleLaterTodo: 'todos/actionToggleLaterTodo',
     actionEditTodo : 'todos/actionEditTodo'
    })
    
  }
}
</script>

<style>
body{
  background-color: #e6e6e6;
}

.big-section
 {
   background-color :white;

   border-radius : 20px 0 0 20px ;
   border-right : solid 1px silver;
   height : 80vh;
   min-width : 380px;
 }
.sticky-container
{
  border-top : solid 1px silver;
  border-bottom : solid 1px silver;

  height : 60vh;
  overflow: auto;
}

.todos-input
{
  width : 100%;
  height : 5vh;
  background-color : white;
  padding : 20px;
  border-radius : 50px;
  border : solid 2px rgb(236, 236, 236);

}

.todo-container
{
  width : 25%;
  min-width : 300px;
}
.dones-container
{
  height : 70vh;
  min-width : 350px;
  margin-top : 7.4vh;
  height : 60vh;
}
.done-container
{
    width : 100%;
    min-width : 300px;
    overflow-wrap: break-word;
}

.big-section-done
{
  border-radius : 0 20px 20px 0 ;
  border-right : none;
}

.important-todo
{
  background-color: #e94817;

}


.later-todo
{
  font-size: 0.8em;
  
}

.active-btn
{
  background-color: #e94817;

}
.todo-title
{
  padding : 10px;
  overflow-wrap: break-word  ;
}

</style>

