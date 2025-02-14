<script setup>
    import { computed, reactive } from 'vue'
    import { useTodoStore } from '../stores/TodoStore'
    import { storeToRefs } from 'pinia'
    import { helpers, maxLength, required } from '@vuelidate/validators'
    import { useVuelidate } from '@vuelidate/core'

    const todoStore = useTodoStore()
    const { filterCompleted } = storeToRefs(todoStore)
    const filteredTodo = computed(() => filterCompleted ? todoStore.filterTasks() : todoStore.todos)

    const state = reactive({
        newTodo: ''
    })

    const todoRegex = helpers.withMessage('Todo cannot contain special letters', helpers.regex(/^[a-zA-Z0-9 ]*$/))

    const rules = {
        newTodo: { 
            maxLength: maxLength(40),
            todoRegex
        }
    }
    const v$ = useVuelidate(rules, state)


    const addTodo = () => {
        v$.value.newTodo.$touch()
        if (!v$.value.newTodo.$invalid) {
            todoStore.addTodo(state.newTodo)
            state.newTodo = ''
        }

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
                        v-model="state.newTodo"
                        label="New Todo"
                        required
                        outlined 
                        :error-messages="v$.$error ? v$.$errors[0].$message : ''"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="pt-5">
                    <v-btn
                        id="add-btn"
                        color="primary"
                        type="submit"
                        class="text-uppercase"
                        :disabled="!state.newTodo.trim()"
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

        <h2 v-if="filteredTodo.length == 0">You have nothing todo!</h2>
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