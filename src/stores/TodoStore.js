import { defineStore } from "pinia";

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todoNum: 1,
        todos: [],
        filterCompleted: false // Filter out completed tasks
    }),

    getters: {
        getIncompleteTodos: (state) => state.todos.filter((t) => !t.completed),
    },

    actions: {
        addTodo(newTodo) {
            this.todos.push({number: this.todoNum++, todo: newTodo, completed: false})
            localStorage.setItem("todo", JSON.stringify(this.todos))
        },
        removeTodo(n) {
            this.todos = this.todos.filter((t) => t.number != n)
            this.todoNum = 1
            for (let todo of this.todos) {
                todo.number = this.todoNum++
            }
            localStorage.setItem("todo", JSON.stringify(this.todos))
        },
        filterTasks() {
            return this.filterCompleted ? this.getIncompleteTodos : this.todos
        }
    }
})