/// <reference types="cypress" />

describe('書籍レビューアプリを訪れる', () => {
    it('書籍レビューアプリを訪れる', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]')                //ID入力欄を取得
    .type('aaa@222')                             //ID欄にIDを入力

    cy.get('input[name="password"]')             //password入力欄を取得
    .type('11111')                           //password欄に間違ったpasswordを入力

    cy.get('.send-btn').click().wait(1500)    //ボタンをクリック ⇨ 1500ms待機

    cy.get('input[name="password"]').clear()     //e-mail欄の文字を削除

    cy.get('input[name="password"]')             //正しいpasswordを入力し、送信
    .type('00000').wait(1500)
    
    cy.get('.send-btn').click()
  })
})