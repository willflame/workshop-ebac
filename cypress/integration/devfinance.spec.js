/// <reference types="cypress" />

describe('DevFinance', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('BASE_URL'));
    });

    it('Adicionar uma nova transação de entrada, e verificar os valores calculados.', () => {
        cy.get('a[onclick*=open]').click();
        cy.get('#description').type('Freela');
        cy.get('#amount').type(12);
        cy.get('#date').type('2021-11-03');
        
        cy.contains('button', 'Salvar').click();

        cy.get('table tbody tr').should('have.length', 1);
        cy.get('#incomeDisplay').contains('R$ 12,00');
        cy.get('#expenseDisplay').contains('R$ 0,00');
        cy.get('#totalDisplay').contains('R$ 12,00');
    });

    it('Deve adicionar uma saida, verificar os valores calculados.', () => {
        cy.get('a[onclick*=open]').click();
        cy.get('#description').type('Combustivel');
        cy.get('#amount').type(-200);
        cy.get('#date').type('2021-11-03');

        cy.contains('button', 'Salvar').click();

        cy.get('table tbody tr').should('have.length', 1);
        cy.get('#incomeDisplay').contains('R$ 0,00');
        cy.get('#expenseDisplay').contains('-R$ 200,00');
        cy.get('#totalDisplay').contains('-R$ 200,00');

    });

    it('Deve adicionar uma entrada e saida, verificar os valores calculados.', () => {
        cy.get('a[onclick*=open]').click();
        cy.get('#description').type('Grana emprestada');
        cy.get('#amount').type(600);
        cy.get('#date').type('2021-11-03');
        cy.contains('button', 'Salvar').click();

        cy.get('a[onclick*=open]').click();
        cy.get('#description').type('Mercado');
        cy.get('#amount').type(-250.35);
        cy.get('#date').type('2021-11-03');
        cy.contains('button', 'Salvar').click();

        cy.get('table tbody tr').should('have.length', 2);
        cy.get('#incomeDisplay').contains('R$ 600,00');
        cy.get('#expenseDisplay').contains('-R$ 250,35');
        cy.get('#totalDisplay').contains('R$ 349,65');

    });

    it('Deve adicionar uma entrada e excluir', () => {
        cy.get('a[onclick*=open]').click();
        cy.get('#description').type('Combustivel');
        cy.get('#amount').type(-200);
        cy.get('#date').type('2021-11-03');

        cy.contains('button', 'Salvar').click();

        cy.get('table tbody tr').should('have.length', 1);
        cy.get('#incomeDisplay').contains('R$ 0,00');
        cy.get('#expenseDisplay').contains('-R$ 200,00');
        cy.get('#totalDisplay').contains('-R$ 200,00');

        cy.get(':nth-child(4) > img').click();
        cy.get('table tbody tr').should('have.length', 0);
    });
});