/// <reference types="cypress" />

describe('書籍レビューアプリを訪れる', () => {
    it('書籍レビューアプリを訪れる', () => {
    cy.visit('http://localhost:3000/signup')
    cy.get('input[name="name"]')                //お名前入力欄を取得
    .type('test')                             //お名前欄に文字を入力

    cy.get('input[name="email"]')             //e-mail入力欄を取得
    .type('sample')                           //e-mail欄に間違ったアドレスを入力 ⇨　アラート表示

    cy.get('.send-btn').click().wait(1500)    //ボタンをクリック ⇨ 1500ms待機

    cy.get('input[name="email"]').clear()     //e-mail欄の文字を削除

    cy.get('input[name="email"]')             //正しいアドレスを入力し、送信
    .type('sample@email.com').wait(1500)
    
    cy.get('.send-btn').click()
  })
})