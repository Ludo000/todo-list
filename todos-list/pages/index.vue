<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
  </ul>
</template>

<script>

import { mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    todos () {
      this.$store.dispatch('todos/getTodos')
      return this.$store.state.todos.list
    }
  },
  methods: {

    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
    
  }
}
</script>

