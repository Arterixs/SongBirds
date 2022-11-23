import { Control } from '../../control/control'
import { Model } from '../../model/model'

export class ResultPage extends Model {
  mainRes

  onNewGame

  onMenu

  constructor(node, score) {
    super()
    this.node = node
    this.score = score
    this.initPage()
  }

  initPage() {
    this.mainRes = new Control(this.node, 'div', 'main__wrap')
    const contentCont = new Control(this.mainRes.node, 'div', 'container')
    const textCongrat = new Control(contentCont.node, 'p', 'congrat')
    textCongrat.node.textContent = 'Поздравляем!'
    const text = new Control(contentCont.node, 'p', 'congrat-content')
    text.node.textContent = `Вы набрали ${this.score.textContent} баллов!`
    const buttonPlay = new Control(this.mainRes.node, 'button', 'button-res')
    const spanPlay = new Control(buttonPlay.node, 'span', 'button-res__span')
    spanPlay.node.textContent = 'Сыграть ещё раз'
    buttonPlay.node.onclick = () => {
      this.onNewGame()
    }
    const buttonMenu = new Control(this.mainRes.node, 'button', 'button-res')
    const spanMenu = new Control(buttonMenu.node, 'span', 'button-res__span')
    spanMenu.node.textContent = 'Главное меню'
    buttonMenu.node.onclick = () => {
      this.onMenu()
    }
  }
}
