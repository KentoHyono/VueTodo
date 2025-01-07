const baseURL = 'https://kento-vue-todo.netlify.app/'
const todoInput = '#input-0'
const addBtn = '.v-btn'
const todoList = ['Get a dog', 'Buy a car', 'Be rich', 'Eat something']

const addTodos = () => {
    cy.visit(baseURL)   
    cy.contains('You have nothing todo!')

    for (const todo of todoList) {
      console.log(todo)
      cy.get(todoInput).type(todo)
      cy.get(addBtn).click()
    }
}

describe('Vue todo test spec', () => {
  it('Add todos', () => {
    addTodos()

    let n = 1
    for (const todo of todoList) {
      cy.contains(todo)
      cy.contains(n++)
    }
  })

  it('Remove todos', () => {
    addTodos()
    
    
  })
})