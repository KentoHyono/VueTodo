<script setup>
    import { ref } from 'vue'

    let n = 1
    const todos = ref([
        { number: n++, todo: 'Have a car', completed: false},
        { number: n++, todo: 'Have family', completed: false},
        { number: n++, todo: 'Skydibing', completed: false},
    ])

    let newTodo = ref('')

    function addTodo() {
        todos.value.push({ number: n++, todo: newTodo.value, completed: false})
        newTodo.value = ''
    }

    function checkCompleted(todo) {
        todo.completed = !todo.completed;
    }

    function removeTodo(todo) {
        todos.value = todos.value.filter((t) => t != todo)
        n = 1;
        for (todo of todos.value) {
            todo.number = n++;
        }
    }
</script>

<template>
    <form @submit.prevent="addTodo">
        <input type="text" v-model="newTodo" required placeholder="New Todo">
        <button>Add Todo</button>
    </form>

    <table>
        <tr>
            <th>Number</th>
            <th>TODO</th>
            <th>Done</th>
        </tr>
        <tr v-for="todo in todos" :key="todo.number">
            <td>{{ todo.number }}</td>
            <td><span :class="{done: todo.completed}">{{ todo.todo }}</span></td>
            <td>
                <!-- <button @click="checkCompleted(todo)">
                    {{ todo.completed ? 'X' : 'Y' }}
                </button> -->
                <input type="checkbox" v-model="todo.completed"/>
            </td>
            <td>
                <button @click="removeTodo(todo)">&#128465;
                </button>
            </td>
        </tr>
    </table>
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