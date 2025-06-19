<template>
  <div class="todo-container">
    <h2>Minecraft //TODO LIST</h2>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" type="text" placeholder="Ajouter une tâche..." />
      <button type="submit">Ajouter</button>
    </form>
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="[
          todo.done ? 'done' : '',
          todo.inProgress && !todo.done ? 'in-progress' : '',
        ]"
      >
        <input type="checkbox" v-model="todo.done" @change="toggleDone(todo)" />
        <span>
          {{ todo.text }}
          <span v-if="todo.inProgress && !todo.done">(En cours...)</span>
        </span>
        <button @click="deleteTodo(todo.id)" class="delete">Supprimer</button>
        <button
          v-if="!todo.done"
          @click="setInProgress(todo)"
          :class="['progress', todo.inProgress ? 'in' : '']"
        >
          {{ todo.inProgress ? "Pas en cours" : "En cours" }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

const todos = ref([]);
const newTodo = ref("");
const api = "http://82.66.162.121:3001/api/todos";
let intervalId = null;

const fetchTodos = async () => {
  const res = await axios.get(api);
  todos.value = res.data.map((t) => ({
    ...t,
    done: !!t.done,
    inProgress: !!t.inProgress,
  }));
};

const addTodo = async () => {
  if (!newTodo.value.trim()) return;
  const res = await axios.post(api, { text: newTodo.value });
  // On récupère l'état réel depuis le backend (qui doit renvoyer inProgress: 0)
  todos.value.push({ ...res.data });
  newTodo.value = "";
};

const deleteTodo = async (id) => {
  await axios.delete(`${api}/${id}`);
  todos.value = todos.value.filter((t) => t.id !== id);
};

const toggleDone = async (todo) => {
  await axios.put(`${api}/${todo.id}`, { done: todo.done });
};

const setInProgress = async (todo) => {
  await axios.put(`${api}/${todo.id}`, { inProgress: !todo.inProgress });
  fetchTodos();
};

onMounted(() => {
  fetchTodos();
  intervalId = setInterval(fetchTodos, 5000); // refresh toutes les 5 secondes
});
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<!-- CSS classique, plus de classes Tailwind -->
