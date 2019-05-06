<template>
  <v-container grid-list-lg>
    <v-layout align-center justify-center row>
        <v-flex xs10 class="bigcard">
          <v-flex xs12 class="text-xs-center title my-1">À faire</v-flex>
            <input class="todos-input" placeholder="Entrez ici une nouvelle chose à faire" @keyup.enter="addTodo"/>
            <br/><br/>
            <v-container grid-list-md text-xs-center id="sticky" class="sticky-container">
              <v-layout wrap>
              <div v-for="todo in todos" :key="todo.id" class="todo-container">
                <v-flex v-if="!todo.completed" :class="todo.important ? 'importantTodo' : ''" >
                  <v-card  color="#ffe260" :class="todo.later ? 'laterTodo' : ''" >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat color="red" @click="actionDeleteTodo(todo)">✖</v-btn>
                    </v-card-actions>
                    <v-card-title>{{ todo.title }}</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat color="green" @click="actionToggleTodo(todo)">✔</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                </div>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex xs2 class="bigcard bigcard-done">
            <v-flex xs12 class="text-xs-center title my-1">Fait</v-flex>
              <v-container grid-list-md text-xs-center class="sticky-container dones-container">
                <v-layout wrap>
                  <div v-for="todo in todos" :key="todo.id"  class="done-container">
                    <v-flex v-if="todo.completed">
                      <v-card  color="#ffe260">
                        <v-card-actions>
                          <v-btn flat color="orange" @click="actionToggleTodo(todo)">⮌</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn flat color="red" @click="actionDeleteTodo(todo)" >✖</v-btn>
                        </v-card-actions>
                      <v-card-title>{{ todo.title }}</v-card-title>
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
    ...mapActions({
      getTodos: 'todos/actionGetTodos'
    }),
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
      remove : 'todos/remove'
    }),
    ...mapActions({
     actionGetTodos: 'todos/actionGetTodos',
     actionAddTodo: 'todos/actionAddTodo',
     actionDeleteTodo: 'todos/actionDeleteTodo',
     actionToggleTodo: 'todos/actionToggleTodo'
    })
    
  }
}
</script>

<style>
body{
  background-color: #e6e6e6;
}

.bigcard
 {
   background-color :white;

   border-radius : 20px 0 0 20px ;
   border-right : solid 1px silver;
   height : 80vh;
   min-width : 280px;
 }
.sticky-container
{
  background-color :#fcfcfc;
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
    width : 33%;
    min-width : 200px;
}
.dones-container
{
    height : 70vh;
     min-width : 250px;
   
}
.done-container
{
    width : 100%;
    min-width : 200px;
}

.bigcard-done
{
  border-radius : 0 20px 20px 0 ;
  border-right : none;
}

.importantTodo
{
  background-color: red;
  font-size: 1.2em;
  font-style : bold;
}

.laterTodo
{
  background-color: grey;
  font-size: 0.8em;
  font-style : italic;
  
}


</style>

