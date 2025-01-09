const todoInput = '#input-0'
const addBtn = '.v-btn'
const todoList = ['Get a dog', 'Buy a car', 'Be rich', 'Eat something']
const deleteBtn = '.trash-btn'
const todoTable = '#todo-table'
const filterSwitch = '#switch-3'

const addTodos = () => { 
    cy.visit('/')
    cy.contains('You have nothing todo!')

    for (const todo of todoList) {
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

    cy.get(todoTable).find('input[type=checkbox]').eq(0).click()
    cy.get(todoTable).find('input[type=checkbox]').eq(2).click()
    cy.get(todoTable).find('span').eq(0).should('have.class', 'done')
                                        .should('have.css', 'text-decoration-line', 'line-through')
    cy.get(todoTable).find('span').eq(1).should('not.have.class', 'done')
    cy.get(todoTable).find('span').eq(2).should('have.class', 'done')
                                        .should('have.css', 'text-decoration-line', 'line-through')
    cy.get(todoTable).find('span').eq(3).should('not.have.class', 'done')

    cy.get(filterSwitch).click()
    cy.get(todoTable).should('not.contain', 1)
                     .should('not.contain', 3)
                     .should('contain', 2)
                     .should('contain', 4)
                     .should('contain.text', 'Buy a car')
                     .should('contain.text', 'Eat something')

    cy.get(filterSwitch).click()
    cy.get(todoTable).should('contain', 1)
                     .should('contain', 2)
                     .should('contain', 3)
                     .should('contain', 4)

    cy.get(todoTable).find('input[type=checkbox]').eq(1).click()
    cy.get(todoTable).find('input[type=checkbox]').eq(3).click()
    cy.get(filterSwitch).click()
    cy.contains('You have nothing todo!')
  })
})