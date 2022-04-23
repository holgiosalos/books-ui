import { recurse } from 'cypress-recurse'

export function paginatedSearchOfBook(bookToSearch) {
    return recurse(
        () => cy.contains('td', bookToSearch).should(() => {}),
        ($book) => $book.length > 0,
        {
            limit: 10,
            post() {
                cy.get('[ng-reflect-type="next"]').click();
            }
        }
    )
}

function selectItemsPerPage(itemsToSelect) {
    cy.get('nz-select').click();
    cy.get('.ant-select-item-option-content').filter(`:contains(${itemsToSelect})`).click();
}

export function fullPageSearchOfBook(bookToSearch) {
    selectItemsPerPage(50);
    cy.get('nz-select').contains(50);
    return cy.contains('td', bookToSearch);
}