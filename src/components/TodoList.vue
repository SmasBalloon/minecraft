<template>
  <div class="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
    <h2 class="text-2xl font-bold mb-6 text-center">Ma Todo List</h2>
    <form @submit.prevent="addTodo" class="flex gap-2 mb-6">
      <input
        v-model="newTodo"
        placeholder="Ajouter une tâche..."
        class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Ajouter
      </button>
    </form>
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center gap-2 mb-3 p-2 rounded"
      >
        <input
          type="checkbox"
          v-model="todo.done"
          @change="toggleDone(todo)"
          class="accent-blue-500"
        />
        <span
          :class="{
            'line-through text-gray-400': todo.done,
            'text-gray-800': !todo.done,
          }"
          class="flex-1"
          >{{ todo.text }}</span
        >
        <button
          @click="deleteTodo(todo.id)"
          class="text-red-500 px-2 py-1 rounded hover:bg-red-100 transition"
        >
          Supprimer
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const todos = ref([]);
const newTodo = ref("");
const api = "http://localhost:3001/api/todos";

const fetchTodos = async () => {
  const res = await axios.get(api);
  todos.value = res.data.map((t) => ({ ...t, done: !!t.done }));
};

const addTodo = async () => {
  if (!newTodo.value.trim()) return;
  const res = await axios.post(api, { text: newTodo.value });
  todos.value.push(res.data);
  newTodo.value = "";
};

const deleteTodo = async (id) => {
  await axios.delete(`${api}/${id}`);
  todos.value = todos.value.filter((t) => t.id !== id);
};

const toggleDone = async (todo) => {
  await axios.put(`${api}/${todo.id}`, { done: todo.done });
};

onMounted(fetchTodos);
</script>

<!-- Plus de hover sur le li, le bouton reste visible -->
