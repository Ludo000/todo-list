<template>
<v-container grid-list-lg>
  <v-layout row>
      <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5">TODOS</v-flex>
  </v-layout>
  <v-layout justify-center>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-card v-for="todo in todos" :key="todo.id">
          <v-card-title :class="{ done: todo.done }">{{ todo.text }}</v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @change="toggle(todo)">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </v-layout>
    
    <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>

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

