/// <reference types="cypress" />

import loginPage from "../pages/login.page.js"
import Dashboard from "../pages/dashboard.page.js"

describe("Tests du filtre des articles par titre de produit", { tags: ['@TC-004-001', '@TC-004-003', '@TC-004-004', '@filterOptions', '@defaultOption', '@triAZ', '@triZA', '@changementTri', '@persistanceTri', '@regression', '@smoke'] }, () => {
    before(() => {
        cy.fixture("login_credentials").then(function (login_credentials) {
            this.valid_credential = login_credentials.valid
        })
    })

    beforeEach(function () {
        const user = this.valid_credential[0]

        cy.visit("https://www.saucedemo.com/")
        loginPage.doLogin(user.username, user.password)
        cy.url().should("eq", "https://www.saucedemo.com/inventory.html")
    })

    context("Vérification des options de tri", () => {
        it("afficher toutes les options de tri disponibles", { tags: '@filterOptions' }, () => {
            Dashboard.elements.sortDropdown().find('option').should('have.length.greaterThan', 1)
            Dashboard.elements.sortDropdown().find('option[value="az"]').should('exist')
            Dashboard.elements.sortDropdown().find('option[value="za"]').should('exist')
            Dashboard.elements.sortDropdown().find('option[value="lohi"]').should('exist')
            Dashboard.elements.sortDropdown().find('option[value="hilo"]').should('exist')
        })

        it("avoir l'option par défaut sélectionnée", { tags: '@defaultOption' }, () => {
            Dashboard.elements.sortDropdown().find('option:selected').should('have.attr', 'value', 'az')
        })
    })

    context("Test du tri par nom de produit", () => {
        it("trier les produits par nom de A à Z", { tags: ['@TC-004-001', '@triAZ'] }, () => {
            Dashboard.selectionnerTriPar('az')
            cy.wait(1000)
            Dashboard.elements.productTitle().then(($titres) => {
                const nomsProduits = Array.from($titres).map(el => el.textContent.trim())
                const nomsTries = [...nomsProduits].sort()
                expect(nomsProduits).to.deep.equal(nomsTries)
            })
            Dashboard.elements.sortDropdown().find('option:selected').should('contain.text', 'Name (A to Z)')
        })

        it("trier les produits par nom de Z à A", { tags: ['@triZA'] }, () => {
            Dashboard.selectionnerTriPar('za')
            cy.wait(1000)
            Dashboard.elements.productTitle().then(($titres) => {
                const nomsProduits = Array.from($titres).map(el => el.textContent.trim())
                const nomsTries = [...nomsProduits].sort().reverse()
                expect(nomsProduits).to.deep.equal(nomsTries)
            })
            Dashboard.elements.sortDropdown().find('option:selected').should('contain.text', 'Name (Z to A)')
        })
    })

    context("Test de changement de tri", () => {
        it("changer le tri de A-Z vers Z-A et vérifier l'ordre", { tags: ['@changementTri'] }, () => {
            // Tri initial A-Z
            Dashboard.selectionnerTriPar('az')
            cy.wait(1000)
            Dashboard.elements.productTitle().then(($titres) => {
                const nomsProduits = Array.from($titres).map(el => el.textContent.trim())
                const nomsTries = [...nomsProduits].sort()
                expect(nomsProduits).to.deep.equal(nomsTries)
            })

            // Changement vers Z-A
            Dashboard.selectionnerTriPar('za')
            cy.wait(1000)
            Dashboard.elements.productTitle().then(($titres) => {
                const nomsProduits = Array.from($titres).map(el => el.textContent.trim())
                const nomsTries = [...nomsProduits].sort().reverse()
                expect(nomsProduits).to.deep.equal(nomsTries)
            })
        })
    })

    context("Persistance du tri", () => {
        it("maintenir le tri après ajout d'un produit au panier", { tags: ['@persistanceTri'] }, () => {
            Dashboard.selectionnerTriPar('za')
            cy.wait(1000)
            Dashboard.elements.productTitle().then(($titres) => {
                const nomsProduits = Array.from($titres).map(el => el.textContent.trim())
                const nomsTries = [...nomsProduits].sort().reverse()
                expect(nomsProduits).to.deep.equal(nomsTries)
            })

            // Ajouter un produit au panier
            Dashboard.selectRandomProduct().then((product) => {
                Dashboard.recupererNomProduit(product).then((nomProduit) => {
                    const nomFormate = nomProduit.toLowerCase().replace(/\s+/g, '-')
                    Dashboard.ajouterProduitAuPanier(nomFormate)
                })
            })

            // Vérifier que le tri est maintenu
            cy.wait(1000)
            Dashboard.elements.productTitle().then(($titres) => {
                const nomsProduits = Array.from($titres).map(el => el.textContent.trim())
                const nomsTries = [...nomsProduits].sort().reverse()
                expect(nomsProduits).to.deep.equal(nomsTries)
            })
            Dashboard.elements.sortDropdown().find('option:selected').should('contain.text', 'Name (Z to A)')
        })
    })
})
