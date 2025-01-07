<script setup>
    import { ref } from 'vue'
    import { useTodoStore } from '../stores/TodoStore'
    import { storeToRefs } from 'pinia';

    const todoStore = useTodoStore()
    const { todos } = storeToRefs(todoStore)

    let newTodo = ref('')

</script>

<template>
    <form @submit.prevent="todoStore.addTodo(newTodo)">
        <input type="text" v-model="newTodo" required placeholder="New Todo">
        <button>Add Todo</button>
    </form>

    <h2 v-if="todoStore.getTodoCount == 0">You have nothing todo!</h2>
    <div v-else>
        <table>
            <tr>
                <th>Number</th>
                <th>TODO</th>
                <th>Done</th>
            </tr>
            <tr v-for="todo in todoStore.filterTasks()" :key="todo.number">
                <td>{{ todo.number }}</td>
                <td><span :class="{done: todo.completed}">{{ todo.todo }}</span></td>
                <td>
                    <!-- <button @click="checkCompleted(todo)">
                        {{ todo.completed ? 'X' : 'Y' }}
                    </button> -->
                    <input type="checkbox" v-model="todo.completed"/>
                </td>
                <td>
                    <button @click="todoStore.removeTodo(todo.number)">&#128465;
                    </button>
                </td>
            </tr>
        </table>
        <div>
            <input type="checkbox" @input="todoStore.filterCompleted = !todoStore.filterCompleted">
            <span>Filter Incompleted Todos</span>
        </div>
    </div>
</template>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    border: solid 1px white;
}

th, td {
    padding: 10px;
    text-align: left;
}

.done {
    text-decoration: line-through;
}

form {
    margin: 30px;
}

input[type=checkbox] {
    width: 20px;
    height: 20px;
}

input[type=text] {
    height: 30px;
}

</style>