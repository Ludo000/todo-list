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
            <div v-for="todo in todos" :key="todo.id" class="todo-container">
              <v-flex
                v-if="!todo.completed"
                :class="todo.important ? 'important-todo' : todo.later ? 'later-todo' : ''"
              >
                <v-card color="#ffe260">
                  <v-card-actions>
                    <v-btn
                      flat
                      title="Editer cette tâche"
                      @click="toggleEdit(todo)"
                      :class="todo.isCurrentlyEdited ? 'active-btn' : ''"
                      :color="todo.isCurrentlyEdited ? 'white' : 'black'"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="red"
                      title="Supprimer cette tâche"
                      @click="actionDeleteTodo(todo)"
                    >
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <p class="todo-title" v-if="!todo.isCurrentlyEdited">
                    {{ todo.id }}. {{ todo.title }}
                    <b v-if="todo.important">#important</b>
                    <i v-if="todo.later">#later</i>
                  </p>
                  <input
                    type="text"
                    v-bind:value="todo.title"
                    v-on:input="todo.newTitle = $event.target.value"
                    v-if="todo.isCurrentlyEdited"
                    class="todo-input"
                  />
                  <v-btn
                    flat
                    color="red"
                    title="Valider l'édition de cette tâche"
                    v-if="todo.isCurrentlyEdited"
                    @click="actionEditTodo(todo)"
                  >Valider</v-btn>
                  <v-btn
                    flat
                    color="red"
                    title="Annuler l'édition de cette tâche"
                    v-if="todo.isCurrentlyEdited"
                    @click="toggleEdit(todo)"
                  >Annuler</v-btn>
                  <v-card-actions>
                    <v-btn
                      flat
                      title="Basculer l'état 'important' de cette tâche"
                      @click="actionToggleImportantTodo(todo)"
                      :class="todo.important ? 'active-btn' : ''"
                      :color="todo.important ? 'white' : 'red'"
                    >
                      <v-icon>error_outline</v-icon>
                    </v-btn>
                    <v-btn
                      flat
                      title="Basculer l'état 'plus tard' de cette tâche"
                      @click="actionToggleLaterTodo(todo)"
                      :class="todo.later ? 'active-btn' : ''"
                      :color="todo.later ? 'white' : 'black'"
                    >
                      <v-icon>schedule</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="green"
                      title="Marquer cette tâche comme complétée"
                      @click="actionToggleTodo(todo)"
                    >
                      <v-icon>done</v-icon>
                    </v-btn>
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
            <div v-for="todo in todos" :key="todo.id" class="done-container">
              <v-flex
                v-if="todo.completed"
                :class="todo.important ? 'important-todo' : todo.later ? 'later-todo' : ''"
              >
                <v-card color="#ffe260">
                  <v-card-actions>
                    <v-btn
                      flat
                      title="Editer cette tâche"
                      @click="toggleEdit(todo)"
                      :class="todo.isCurrentlyEdited ? 'active-btn' : ''"
                      :color="todo.isCurrentlyEdited ? 'white' : 'black'"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="red"
                      title="Supprimer cette tâche"
                      @click="actionDeleteTodo(todo)"
                    >
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <p class="todo-title" v-if="!todo.isCurrentlyEdited">
                    {{ todo.id }}. {{ todo.title }}
                    <b v-if="todo.important">#important</b>
                    <i v-if="todo.later">#later</i>
                  </p>
                  <input
                    type="text"
                    v-bind:value="todo.title"
                    v-on:input="todo.newTitle = $event.target.value"
                    v-if="todo.isCurrentlyEdited"
                    class="todo-input"
                  />
                  <v-btn
                    flat
                    color="red"
                    title="Valider l'édition de cette tâche"
                    v-if="todo.isCurrentlyEdited"
                    @click="actionEditTodo(todo)"
                  >Valider</v-btn>
                  <v-btn
                    flat
                    color="red"
                    title="Annuler l'édition de cette tâche"
                    v-if="todo.isCurrentlyEdited"
                    @click="toggleEdit(todo)"
                  >Annuler</v-btn>
                  <v-card-actions>
                    <v-btn
                      flat
                      title="Basculer l'état 'important de cette tâche'"
                      @click="actionToggleImportantTodo(todo)"
                      :class="todo.important ? 'active-btn' : ''"
                      :color="todo.important ? 'white' : 'red'"
                    >
                      <v-icon>error_outline</v-icon>
                    </v-btn>
                    <v-btn
                      flat
                      title="Basculer l'état 'plus tard de cette tâche'"
                      @click="actionToggleLaterTodo(todo)"
                      :class="todo.later ? 'active-btn' : ''"
                      :color="todo.later ? 'white' : 'black'"
                    >
                      <v-icon>schedule</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="orange"
                      title="Marquer cette tâche comme non-complétée"
                      @click="actionToggleTodo(todo)"
                    >
                      <v-icon>undo</v-icon>
                    </v-btn>
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
import { mapMutations, mapActions } from "vuex";

export default {
  mounted: function() {
    this.$store.dispatch("todos/actionGetTodos");
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    }
  },
  methods: {
    addTodo(e) {
      this.actionAddTodo(e.target.value);
      e.target.value = "";

      //scroll down
      var container = this.$el.querySelector("#sticky");
      container.scrollTop = container.scrollHeight;
    },
    ...mapMutations({
      toggle: "todos/toggle",
      remove: "todos/remove",
      toggleEdit: "todos/toggleEdit"
    }),
    ...mapActions({
      actionGetTodos: "todos/actionGetTodos",
      actionAddTodo: "todos/actionAddTodo",
      actionDeleteTodo: "todos/actionDeleteTodo",
      actionToggleTodo: "todos/actionToggleTodo",
      actionToggleImportantTodo: "todos/actionToggleImportantTodo",
      actionToggleLaterTodo: "todos/actionToggleLaterTodo",
      actionEditTodo: "todos/actionEditTodo"
    })
  }
};
</script>

<style>
body {
  background-color: #e6e6e6;
}

.big-section {
  background-color: white;

  border-radius: 20px 0 0 20px;
  border-right: solid 1px silver;
  height: 80vh;
  min-width: 380px;
}
.sticky-container {
  border-top: solid 1px silver;
  border-bottom: solid 1px silver;

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

.big-section-done {
  border-radius: 0 20px 20px 0;
  border-right: none;
}

.important-todo {
  background-color: #e94817;
}

.later-todo {
  background-color: rgb(146, 150, 145);
  opacity: 0.7;
}

.active-btn {
  background-color: #e94817;
  color: white;
}
.todo-title {
  max-width: 300px;
  padding: 10px;
  overflow-wrap: break-word;
}

.todo-input {
  width: 90%;
  height: 5vh;
  background-color: white;
  border-radius: 50px;
  border: solid 2px red;
  max-width: 300px;
  padding-left: 5%;
  padding-right: 5%;
}
.todo-container {
  max-width: 300px;
}
</style>

