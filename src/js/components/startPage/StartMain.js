import { Control } from '../../control/control'

export class StartMain {
  static name = 'main'

  onNewGame

  onRules

  onGallery

  btnRules

  btnSetting

  constructor(node) {
    this.node = node
  }

  render() {
    const main = new Control(this.node, 'main', 'main')
    const headerWrap = new Control(main.node, 'div', 'main__wrap')
    const listBtn = new Control(headerWrap.node, 'ul', 'list-button')
    const listItemStart = new Control(listBtn.node, 'li', 'list-item')
    const btnStart = new Control(listItemStart.node, 'button', 'list-item__btn')
    const btnStartContentIgnor = new Control(btnStart.node, 'span', 'list-item__btn-span', 'Новая игра')
    btnStart.node.onclick = () => {
      this.onNewGame(headerWrap.node, main.node)
    }
    const listItemRules = new Control(listBtn.node, 'li', 'list-item')
    const btnRules = new Control(listItemRules.node, 'button', 'list-item__btn')
    btnRules.node.onclick = () => {
      this.onRules(headerWrap.node, main.node)
    }
    const btnRulesContentIgnor = new Control(btnRules.node, 'span', 'list-item__btn-span', 'Правила')
    const listItemGallery = new Control(listBtn.node, 'li', 'list-item')
    const btnGallery = new Control(listItemGallery.node, 'button', 'list-item__btn')
    btnGallery.node.onclick = () => {
      this.onGallery(headerWrap.node, main.node)
    }
    const btnGalleryContentIgnor = new Control(btnGallery.node, 'span', 'list-item__btn-span', 'Галерея')
  }
}
