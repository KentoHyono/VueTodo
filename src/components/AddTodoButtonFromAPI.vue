<script setup>
    import { useTodoStore } from '../stores/TodoStore'
    import { getRandomTodo } from '../../apiServices/todoAPI';

    const todoStore = useTodoStore()

    const addRandomTodo = async () => {
        const data = await getRandomTodo(3000)
        todoStore.addTodo(data.todo)
    }
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn color="primary" class="text-uppercase" @click="addRandomTodo">Add a random todo</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>