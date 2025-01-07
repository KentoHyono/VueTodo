import { defineStore } from "pinia";

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todoNum: 1,
        todos: [],
        filterCompleted: false // Filter out completed tasks
    }),

    getters: {
        getIncompleteTodos: (state) => state.todos.filter((t) => !t.completed),
        getTodoCount: (state) => state.todos.length,
    },

    actions: {
        addTodo(newTodo) {
            this.todos.push({number: this.todoNum++, todo: newTodo, completed: false})
        },
        removeTodo(n) {
            this.todos = this.todos.filter((t) => t.number != n)
            this.todoNum = 1
            for (let todo in this.todos) {
                todo.number = this.todoNum++
            }
        },
        filterTasks() {
            return this.filterCompleted ? this.getIncompleteTodos : this.todos
        }
    }
})