<script setup>
    import { computed, ref } from 'vue'
    import { useTodoStore } from '../stores/TodoStore'
import { storeToRefs } from 'pinia'

    const todoStore = useTodoStore()
    const { filterCompleted } = storeToRefs(todoStore)
    const filteredTodo = computed(() => filterCompleted ? todoStore.filterTasks() : todoStore.todos)

    let newTodo = ref('')

    const addTodo = () => {
        todoStore.addTodo(newTodo.value)
        newTodo.value = ''
    }

    if (localStorage.getItem("todo")) {
        const todosString = localStorage.getItem("todo")
        todoStore.todos = JSON.parse(todosString)
        todoStore.todoNum += todoStore.todos.length;
    }
</script>

<template>
    <!-- <form @submit.prevent="todoStore.addTodo(newTodo)">
        <input type="text" v-model="newTodo" required placeholder="New Todo">
        <button>Add Todo</button>
    </form> -->

    <v-container>
        <v-form @submit.prevent="addTodo" ref="form">
            <v-row>
                <v-col cols="12" sm="8">
                    <v-text-field
                        v-model="newTodo"
                        label="New Todo"
                        required
                        outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="pt-5">
                    <v-btn
                        color="primary"
                        type="submit"
                        class="text-uppercase"
                        :disabled="!newTodo.trim()"
                    >
                        Add Todo
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-switch label="Only show incompleted todos" color="primary" @input="todoStore.filterCompleted = !todoStore.filterCompleted"></v-switch>
                </v-col>
            </v-row>
        </v-form>

        <h2 v-if="todoStore.getTodoCount == 0">You have nothing todo!</h2>
        <div v-else>
            <v-table id="todo-table">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Todo</th>
                        <th>Done</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="todo in filteredTodo" :key="todo.number">
                        <td>{{ todo.number }}</td>
                        <td><span :class="{done: todo.completed}">{{ todo.todo }}</span></td>
                        <td>
                            <!-- <v-checkbox v-model="todo.completed"></v-checkbox> -->
                            <input type="checkbox" v-model="todo.completed"/>
                        </td>
                        <td>
                            <button class="text-h6 trash-btn" @click="todoStore.removeTodo(todo.number)">&#128465;
                            </button>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </v-container>

</template>

<style scoped>
    .done {
        text-decoration: line-through;
    }

</style>