<template>
  <v-flex v-if="todo.completed===showDone">
    <v-card :color="showDone ? '#c5ffbd' : '#ffed9e'">
      <v-card-actions
        :class="todo.important ? 'todo-top-imp' : todo.later ? 'todo-top-later' : showDone ? 'todo-top-done' : 'todo-top'"
      >
        <v-btn
          v-if="!showDone"
          flat
          color="white"
          title="Basculer l'état 'important' de cette tâche"
          @click="actionToggleImportantTodo(todo)"
        >
          <v-icon>error_outline</v-icon>
        </v-btn>
        <v-btn
          v-if="!showDone"
          flat
          color="white"
          title="Basculer l'état 'plus tard' de cette tâche"
          @click="actionToggleLaterTodo(todo)"
        >
          <v-icon>schedule</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-hover>
          <v-btn
            flat
            color="white"
            title="Marquer cette tâche comme complétée"
            @click="actionToggleTodo(todo)"
            slot-scope="{ hover }"
          >
            <v-icon v-if="!hover && !showDone">check_box_outline_blank</v-icon>
            <v-icon v-if="hover || showDone">check_box</v-icon>
          </v-btn>
        </v-hover>
      </v-card-actions>

      <p @click="toggleEdit(todo)" class="todo-title" v-if="!todo.isCurrentlyEdited">
        {{ todo.id }}. {{ todo.title }}
        <b v-if="todo.important">#important</b>
        <b v-if="todo.later">#later</b>
      </p>
      <input
        type="text"
        v-bind:value="todo.title"
        v-on:input="todo.newTitle = $event.target.value"
        v-if="todo.isCurrentlyEdited"
        class="todo-input"
        @keyup.enter="actionEditTodo(todo)"
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
        <v-btn flat color="red" title="Supprimer cette tâche" @click="actionDeleteTodo(todo)">
          <v-icon>delete</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import Todo from "../model/Todo";
export default {
  name: "sticky",
  props: {
    todo: Todo,
    showDone: Boolean
  },
  methods: {
    ...mapMutations({
      toggle: "todos/toggle",
      remove: "todos/remove",
      toggleEdit: "todos/toggleEdit"
    }),
    ...mapActions({
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
  max-width: 300px;
  padding: 5%;
  margin: 5%;
}

.todo-top {
  background-color: #ffae00;
}
.todo-top-done {
  background-color: #6bc25f;
}
.todo-top-imp {
  background-color: #e94817;
}
.todo-top-later {
  background-color: rgb(146, 150, 145);
}
</style>