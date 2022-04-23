import { paginatedSearchOfBook, fullPageSearchOfBook } from './book-dashboard-utils';

const { faker } = require('@faker-js/faker');

let bookName;
let authorName;
describe('Given the user visits the library dashboard', () => {
    before(() => {
        // Arrange
        cy.visit('/dashboard');
    });

    describe('When the user adds a new Book with valid information', () => {
        before(() => {
            // Act
            bookName = `TestBook-${faker.random.words(1)}`;
            authorName = `${faker.name.firstName()} ${faker.name.lastName()}`;

            cy.contains('Add').click();
            cy.get('#name').type(bookName, {force: true}).should('have.value', bookName);
            cy.get('#author').type(authorName);

            cy.contains('Save').click();
        });

        it('The book should be visible in the library board', () => {
            //Assert
            fullPageSearchOfBook(bookName).should('be.visible');
        })

        after(() => {
            fullPageSearchOfBook(bookName)
                .siblings()
                .find('input[type="checkbox"]')
                .click();
            cy.contains('Delete').click();
        })
    });

    describe('When the user creates a book without the required information', () => {
        before(() => {
            // Act
            bookName = `TestBook-${faker.random.words(1)}`;
            cy.contains('Add').click();
            cy.get('#name').type(bookName, {force: true}).should('have.value', bookName);
        })

        it('The book should not be allowed to be saved', () => {
            //Assert
            cy.contains('Save').should('be.disabled');
        })
    })
})