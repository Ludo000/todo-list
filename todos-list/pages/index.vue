<template>
<v-container grid-list-lg>
  <v-layout row>
      <v-flex xs12 class="text-xs-center display-1 font-weight-black my-2">Liste à faire</v-flex>
  </v-layout>
    

  <v-layout align-center justify-center row>

      <v-flex xs10 class="bigcard">
       <v-flex xs12 class="text-xs-center display-1 my-1">À faire</v-flex>
        <input class="todos-input" placeholder="Entrez ici votre nouvelle chose à faire" @keyup.enter="addTodo"/>
        <br/><br/>
        <v-container grid-list-md text-xs-center class="sticky-container">
          <v-layout wrap>
          <div v-for="todo in todos" :key="todo.id" class="todo-container">
            <v-flex v-if="!todo.done">
              <v-card  color="#ffe260">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="red" @click="remove(todo)">✖</v-btn>
                </v-card-actions>
                <v-card-title :class="{ done: todo.done }">{{ todo.text }}</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="green" @click="toggle(todo)">✔</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            </div>
          </v-layout>
        </v-container>
      </v-flex>

      <v-flex xs2 class="bigcard">
                <v-flex xs12 class="text-xs-center display-1 my-1">Fait</v-flex>

        <v-container grid-list-md text-xs-center class="sticky-container dones-container">
          <v-layout wrap>
            <div v-for="todo in todos" :key="todo.id"  class="done-container">
            <v-flex v-if="todo.done">
              <v-card  color="#ffe260">

                <v-card-actions>
                  <v-btn flat color="orange" @click="toggle(todo)">⮌</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn flat color="red" @click="remove(todo)" >✖</v-btn>
                </v-card-actions>
                <v-card-title :class="{ done: todo.done }">{{ todo.text }}</v-card-title>
                
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
            this.$store.dispatch('todos/getTodos')

  },
  computed: {
    ...mapActions({
      getTodos: 'todos/getTodos'
    }),
    todos () {
      
      return this.$store.state.todos.list
    }
  },
  methods: {
    loadTodos(){
        this.$store.dispatch('todos/getTodos')

    },
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      this.$store.dispatch('todos/sendTodos', e.target.value)

      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
    
  }
}
</script>

<style>
body{
  background-color: #f8f7f7;
}

.bigcard
 {
   background-color :#e4e4e4;
   margin : 20px;
   border-radius : 20px;
   height : 80vh;
 }
.sticky-container
{
  background-color : white;
  height : 60vh;
  overflow: auto;
  border-radius : 10px;
}

.todos-input
{
  width : 100%;
  height : 5vh;
  background-color : white;
  padding : 20px;
  border-radius : 50px;
}

.todo-container
{
    width : 33%;
}
.dones-container
{
    height : 70vh;
}
.done-container
{
    width : 100%;
}

</style>

