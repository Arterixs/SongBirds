import { Control } from '../../control/control'

export class StartHeader {
  static name = 'header'

  header

  score

  scoreAmount

  listProgress

  headerLine

  headerLogo

  constructor(node) {
    this.node = node
    this.arr = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы']
  }

  render() {
    this.header = new Control(this.node, 'div', 'header')
    this.headerLogo = new Control(this.header.node, 'div', 'header__logo')
    const titleIgnor = new Control(this.headerLogo.node, 'h1', 'title', 'SongBirds')
    this.score = new Control(this.headerLogo.node, 'div', 'score none')
    const scoreTitleIgnor = new Control(this.score.node, 'p', 'score__title', 'Счёт:')
    this.scoreAmount = new Control(this.score.node, 'p', 'score__amount', '0')
    this.headerLine = new Control(this.header.node, 'div', 'header__line')
    this.listProgress = new Control(this.headerLine.node, 'ul', 'list-progress')
    for (let i = 0; i < this.arr.length; i += 1) {
      const listItemIgnor = new Control(this.listProgress.node, 'li', 'list-item-progress', `${this.arr[i]}`)
    }
  }
}
