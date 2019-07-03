<template>
  <v-container grid-list-lg>
    <v-layout align-center justify-center row>
      <v-flex xs10 class="big-section">
        <v-flex xs12 class="text-xs-center title my-1">À faire</v-flex>
        <input
          type="text"
          class="todos-input"
          placeholder="Entrez ici une nouvelle chose à faire"
          @keyup.enter="addTodo"
        />
        <br />
        <br />
        <v-container grid-list-md text-xs-center id="sticky" class="sticky-container">
          <v-layout wrap>
            <sticky
              v-for="todo in todos"
              :key="todo.id"
              :todo="todo"
              :showDone="false"
              class="todo-container"
            ></sticky>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs2 class="big-section big-section-done">
        <v-flex xs12 class="text-xs-center title my-1">Fait</v-flex>
        <v-container grid-list-md text-xs-center class="sticky-container dones-container">
          <v-layout wrap>
            <sticky
              v-for="todo in todos"
              :key="todo.id"
              :todo="todo"
              :showDone="true"
              class="done-container"
            ></sticky>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import Vue from "vue";
import sticky from "../components/sticky";

export default {
  mounted: function() {
    this.$store.dispatch("todos/actionGetTodos");
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    }
  },
  components: {
    sticky
  },
  methods: {
    addTodo(e) {
      this.actionAddTodo(e.target.value);
      e.target.value = "";

      //scroll down
      var container = this.$el.querySelector("#sticky");
      container.scrollTop = container.scrollHeight;
    },
    ...mapActions({
      actionGetTodos: "todos/actionGetTodos",
      actionAddTodo: "todos/actionAddTodo"
    })
  }
};
</script>

<style>
body,
html {
  background-color: #e6e6e6;
  overflow: auto;
}

.big-section {
  background-color: white;
  border-radius: 20px 0 0 20px;
  border-right: solid 1px silver;
  height: 80vh;
  min-width: 380px;
}
.big-section-done {
  border-radius: 0 20px 20px 0;
  border-right: none;
}
.sticky-container {
  border-top: solid 1px silver;
  border-bottom: solid 1px silver;
  background-color: rgb(253, 253, 253);
  height: 60vh;
  overflow: auto;
}

.todos-input {
  width: 100%;
  height: 5vh;
  background-color: white;
  padding: 20px;
  border-radius: 50px;
  border: solid 2px rgb(236, 236, 236);
}

.dones-container {
  height: 70vh;
  min-width: 350px;
  margin-top: 7.4vh;
  height: 60vh;
}
.done-container {
  width: 100%;
  min-width: 300px;
  overflow-wrap: break-word;
}

.todo-container {
  max-width: 300px;
}
</style>

