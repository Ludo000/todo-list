<template>
<v-container grid-list-lg>

  <v-layout align-center justify-center row>

      <v-flex xs10 class="bigcard">
       <v-flex xs12 class="text-xs-center title my-1">À faire</v-flex>
        <input class="todos-input" placeholder="Entrez ici votre nouvelle chose à faire" @keyup.enter="addTodo"/>
        <br/><br/>
        <v-container grid-list-md text-xs-center id="sticky" class="sticky-container">
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

      <v-flex xs2 class="bigcard bigcard-done">
                <v-flex xs12 class="text-xs-center title my-1">Fait</v-flex>

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
      var container = this.$el.querySelector("#sticky");
      container.scrollTop = container.scrollHeight;

      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle',
      remove : 'todos/remove'
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
}
.dones-container
{
    height : 70vh;
}
.done-container
{
    width : 100%;
}

.bigcard-done
{
  border-radius : 0 20px 20px 0 ;
  border-right : none;
}

</style>

