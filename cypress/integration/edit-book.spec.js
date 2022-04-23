import { paginatedSearchOfBook, fullPageSearchOfBook } from './book-dashboard-utils';

const { faker } = require('@faker-js/faker');

let bookName;
let newBookName;
let authorName;
describe('Given a valid book is created in the library', () => {
    before(() => {
        // Arrange
        cy.visit('/dashboard');

        bookName = `TestBook-${faker.random.words(1)}`;
        authorName = `${faker.name.firstName()} ${faker.name.lastName()}`;
        cy.contains('Add').click();
        cy.get('#name').type(bookName, {force: true}).should('have.value', bookName);
        cy.get('#author').type(authorName);
        cy.contains('Save').click();
    });

    describe('When the author name of the previously created book is updated', () => {
        before(() => {
            paginatedSearchOfBook(bookName)
                .siblings()
                .find('[data-icon="edit"]')
                .click();
            newBookName = `Edited-${bookName}`;
            cy.get('#name').clear({force: true});
            cy.get('#name').type(newBookName, {force: true}).should('have.value', newBookName);
            cy.contains('Save').click();
        })

        it('The book should have updated the bookName in the library dashboard', () => {
            paginatedSearchOfBook(newBookName).should('be.visible');
        })
    })
});