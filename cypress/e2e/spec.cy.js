const baseURL = 'https://kento-vue-todo.netlify.app/'
const todoInput = '#input-0'
const addBtn = '.v-btn'
const todoList = ['Get a dog', 'Buy a car', 'Be rich', 'Eat something']
const deleteBtn = '.trash-btn'

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
    
    cy.get(deleteBtn).eq(0).click()
    cy.get(deleteBtn).should('not.contain', 'Get a dog')
    cy.should('not.contain', 4)
    
    cy.get(deleteBtn).eq(1).click()
    cy.get(deleteBtn).should('not.contain', 'Be rich')
    cy.should('not.contain', 3)

    cy.get(deleteBtn).eq(1).click()
    cy.get(deleteBtn).should('not.contain', 'Eat something')
    cy.should('not.contain', 2)

    cy.get(deleteBtn).eq(0).click()
    cy.get(deleteBtn).should('not.be.undefined')

    cy.contains('You have nothing todo!')
  })

  it('Filter todos', () => {
    addTodos()

  })
})