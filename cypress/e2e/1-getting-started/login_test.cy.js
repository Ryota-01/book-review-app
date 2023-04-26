/// <reference types="cypress" />

describe('書籍レビューアプリE2Eテスト', () => {

  describe('未ログイン状態でのテスト', () => {
    it('レビュー詳細を押下した時', () => {
      cy.visit('http://localhost:3000/home')
      cy.get('a').click()
    })

    describe('会員登録テスト', () => {
      it('未入力の状態で登録ボタン押下', () => {
        cy.visit('http://localhost:3000/signup')
        cy.get('.signup__container__signup-btn').click()
      })
      it('形式に誤りがあるe-mailを入力（失敗）', () => {
        cy.visit('http://localhost:3000/signup')
        cy.get('input[name="name"]').type('テスト太郎')
        cy.get('input[name="email"]').type('yujkmk0123').type('{enter}')
        cy.get('input[name="password"]').type('11111')
        cy.get('input[name="file"]').attachFile('Cat03.jpeg')
        cy.get('.signup__container__signup-btn').click()
      })
      it('5文字以下のPWを入力（失敗）', () => {
        cy.visit('http://localhost:3000/signup')
        cy.get('input[name="name"]').type('テスト太郎')
        cy.get('input[name="email"]').type('yujkmk@123')
        cy.get('input[name="password"]').type('1234').type('{enter}')
        cy.get('input[name="file"]').attachFile('Cat03.jpeg')
        cy.get('.signup__container__signup-btn').click()
      })
      it('会員登録成功', () => {
        cy.visit('http://localhost:3000/signup')
        cy.get('input[name="email"]').type('yujkmk@123').type('{enter}')
        cy.get('input[name="password"]').type('11111')
        cy.get('input[name="file"]').attachFile('Cat03.jpeg')
        cy.get('.signup__container__signup-btn').click()
      })
    })

    describe('ログインテスト', () => {
      it('形式に誤りがあるe-mailを入力（失敗）', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="email"]')
        .type('yujkmk012１２')                                               //誤った形式のe-mail
        .type('{enter}')
        cy.get('input[name="password"]').type('99999')
        cy.get('.login__container__login-btn').click()     //ログインボタン押下
      })
      it('誤ったe-mailとPWを入力した時（失敗）', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="email"]').type('aaa@111')                 //間違ったe-mail
        cy.get('input[name="password"]').type('11111')                //間違ったPW
        cy.get('.login__container__login-btn').click()
      })
  
      it('正しいe-mailとPWを入力した時（成功）', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="email"]').type('e@e')
        cy.get('input[name="password"]').type('99999')
        cy.get('.login__container__login-btn').click()
      })
    })
  })

  describe('ログイン状態でのテスト', () => {
    //ログイン状態を保持するため、最初にログイン処理を実行
    //support/commands.jsにログイン方法記述。fixture/test-user.jsonにユーザー情報を保存。
    beforeEach(() => {
      cy.fixture("test-user.json").then(res => {
        cy.login(res.email, res.password)
      })
    });

    it('BACK・NEXTボタンを押下', () => {
      cy.scrollTo('bottom')
      cy.contains('NEXT').click()
      cy.get('.header__user-name > a').click()
    });

    it('ユーザー情報編集', () => {
      cy.get('.header__user-name > a').click()
      cy.get('input[name="name"]').type('Cypressたかし')
      cy.get('form').submit()
    })

    it('レビューを投稿する', () => {
      cy.get('.edit-btn').click()
      cy.get('form').submit()
      cy.get('input[name="title"]').type('タイトル')
      cy.get('#url').type('url')
      cy.get('textarea[name="detail"]').type('詳細')
      cy.get('textarea[name="review"]').type('レビュー')
      cy.get('form').submit()
    })

    it('レビューを削除する', () => {
      cy.get('.booklists__wrapper__list-item__edit-link > a').first().click()
      cy.contains('削除').click()
    })

    it('レビューを編集する', () => {
      cy.get('.booklists__wrapper__list-item__edit-link > a').first().click()
      cy.get('input[name="title"]').type('編集したタイトル')
      cy.get('#url').type('urlurlurlurlurlurlurlurl')
      cy.get('textarea[name="detail"]').type('編集した詳細編集した詳細編集した詳細編集した詳細')
      cy.get('textarea[name="review"]').type('編集したレビュー')
      cy.contains('更新').click()
    })

  })
})
