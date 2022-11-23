import { Control } from '../../control/control'

export class RulesPage {
  main

  onGame

  onBack

  constructor(node) {
    this.node = node
    this.initRules()
  }

  initRules() {
    this.main = new Control(this.node, 'div', 'main-rules')
    const h2 = new Control(this.main.node, 'h2', 'title-rules')
    h2.node.textContent = 'Приветствую вас на игровой викторине SongBirds!'
    const wrapper = new Control(this.main.node, 'div', 'wrapper')
    const p1 = new Control(wrapper.node, 'p', 'content-rules')
    p1.node.textContent = `SongBirds - это беспроигрышная викторина,
    в ходе которой вам предстоит узнавать птиц слушая только их голос.`
    const p2 = new Control(wrapper.node, 'p', 'content-rules')
    p2.node.textContent = `Правила просты: вам будут даны 6 вариантов ответов
    и только один из них правильный. Если вы не узнали птичку с первого раза,
    не расстраивайтесь и продолжайте игру, лимита на ошибок нет :) Как только
    вы дадите правильный ответ - игра предложит перейти на следующий этап.`
    const p3 = new Control(wrapper.node, 'p', 'content-rules')
    p3.node.textContent = `За каждый пройденный этап вам будут начисляться баллы.
    Всего за игру можно получить 30 баллов. Начисление будет происходить следующим образом:
    если вы дадите правильный ответ с первой попытки - вам начисляется 5 баллов, каждая
    следующая неверная попытка будет давать на 1 балл меньше. Минимальный балл который
    можно получить за этап равен 0.`
    const p4Ignor = new Control(wrapper.node, 'p', 'content-rules', 'Удачи!')
    const wrapperBtn = new Control(this.main.node, 'div', 'wrapper-btn')
    const buttonGame = new Control(wrapperBtn.node, 'button', 'next', 'Начать игру')
    buttonGame.node.onclick = () => this.onGame()
    const buttonBack = new Control(wrapperBtn.node, 'button', 'next', 'Главное меню')
    buttonBack.node.onclick = () => this.onBack()
  }
}
