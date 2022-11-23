import { Control } from '../../control/control'
import { Model } from '../../model/model'
import { inkognito } from '../../import-asset'

export class GamePage extends Model {
  main

  playerText

  paragraph

  descriptionBird

  CardNameLat

  CardName

  CardImg

  mainUpImages

  playerSpan

  playerSpanAlt

  ul

  infoCard

  durationStart

  durationAltStart

  durationAltFinish

  durationFinish

  audioplayer

  audioplayerAlt

  button

  onNext

  onChoise

  onPlay

  onPlayAlt

  onClickInput

  onVolumeBtnClick

  onInputVolume

  onClickInputVolume

  constructor(node) {
    super()
    this.node = node
    this.urlStandart = inkognito
    this.loadImage()
    this.initUp()
    this.initCenter()
    this.initBottom()
    this.context = this
  }

  initUp() {
    this.main = new Control(this.node, 'div', 'main__game')
    const mainUp = new Control(this.main.node, 'div', 'main__block')
    const mainUpImag = new Control(mainUp.node, 'div', 'image-block')
    this.mainUpImages = new Control(mainUpImag.node, 'img', 'image-block__img')
    this.mainUpImages.node.setAttribute('alt', 'bird')
    this.mainUpImages.node.setAttribute('src', this.urlStandart)
    const mainUpPlayer = new Control(mainUp.node, 'div', 'player')
    const playerName = new Control(mainUpPlayer.node, 'div', 'player__name')
    this.playerText = new Control(playerName.node, 'p', 'player__name-bird', '******')
    const blockVolue = new Control(playerName.node, 'div', 'player__name-volue')
    const playerBtnVolue = new Control(blockVolue.node, 'button', 'play-volue')
    playerBtnVolue.node.onclick = () => {
      this.onVolumeBtnClick(this.audioUp.audioMystery, this.audioUp.audioItem, this.volueInput, this.playerSpanVolue)
    }
    this.playerSpanVolue = new Control(playerBtnVolue.node, 'span', 'play-volue__img')
    this.volueInput = new Control(blockVolue.node, 'input', 'volue-input')
    this.volueInput.node.onclick = () => {
      this.onClickInputVolume(this.audioUp.audioMystery, this.audioUp.audioItem, this.volueInput)
    }
    this.volueInput.node.oninput = () => {
      this.onInputVolume(this.audioUp.audioMystery, this.audioUp.audioItem, this.volueInput, this.playerSpanVolue)
    }
    this.volueInput.node.setAttribute('type', 'range')
    this.volueInput.node.setAttribute('value', localStorage.getItem('volume'))
    const playerAudio = new Control(mainUpPlayer.node, 'div', 'player__audio')
    const playerButton = new Control(playerAudio.node, 'button', 'play-btn')
    this.playerSpan = new Control(playerButton.node, 'span', 'play-btn__img')
    playerButton.node.onclick = () => this.onPlay()
    const audio = new Control(playerAudio.node, 'div', 'audio')
    this.audioplayer = new Control(audio.node, 'input', 'audioplayer')
    this.audioplayer.node.onclick = () => this.onClickInput(this.audioUp.audioMystery, this.audioplayer)
    this.audioplayer.node.setAttribute('type', 'range')
    this.audioplayer.node.setAttribute('value', '0')
    const duration = new Control(audio.node, 'div', 'duration')
    this.durationStart = new Control(duration.node, 'p', 'duration__start', '00:00')
    this.durationFinish = new Control(duration.node, 'p', 'duration__finish', '00:00')
  }

  initCenter() {
    const mainCenter = new Control(this.main.node, 'div', 'main__block-category')
    const option = new Control(mainCenter.node, 'div', 'options')
    this.ul = new Control(option.node, 'ul', 'options-bird')
    this.shuffle()
    this.callAudio(this)
    this.initVariant(this.ul)
    const info = new Control(mainCenter.node, 'div', 'info')
    const infoContent = new Control(info.node, 'div', 'info__content')
    this.paragraph = new Control(infoContent.node, 'p', 'instructions')
    const paragraphTextIgnor = new Control(this.paragraph.node, 'span', 'instructions__text', 'Прослушайте плеер')
    const paragraphTextOIgnor = new Control(this.paragraph.node, 'span', 'instructions__text', 'Выберите птицу из списка')
    this.infoCard = new Control(infoContent.node, 'div', 'info__card none')
    const Card = new Control(this.infoCard.node, 'div', 'card')
    this.CardImg = new Control(Card.node, 'img', 'card__image')
    this.CardImg.node.setAttribute('alt', 'bird')
    const CardContent = new Control(Card.node, 'div', 'card-content')
    this.CardName = new Control(CardContent.node, 'p', 'card-content__name')
    this.CardNameLat = new Control(CardContent.node, 'p', 'card-content__en-name')
    const CardControl = new Control(CardContent.node, 'div', 'card-control')
    const playerButton = new Control(CardControl.node, 'button', 'play-btn')
    this.playerSpanAlt = new Control(playerButton.node, 'span', 'play-btn__img')
    playerButton.node.onclick = () => this.onPlayAlt()
    const audio = new Control(CardControl.node, 'div', 'audio')
    this.audioplayerAlt = new Control(audio.node, 'input', 'audioplayer-small')
    this.audioplayerAlt.node.onclick = () => this.onClickInput(this.audioUp.audioItem, this.audioplayerAlt)
    this.audioplayerAlt.node.setAttribute('type', 'range')
    this.audioplayerAlt.node.setAttribute('value', '0')
    const duration = new Control(audio.node, 'div', 'duration-audio')
    this.durationAltStart = new Control(duration.node, 'p', 'duration-audio__start', '00:00')
    this.durationAltFinish = new Control(duration.node, 'p', 'duration-audio__finish', '00:00')
    this.descriptionBird = new Control(this.infoCard.node, 'p', 'info__text')
  }

  initVariant(el) {
    for (let i = 0; i < this.objBird.length; i += 1) {
      const li = new Control(el.node, 'li', 'options-bird__list-item')
      const spanIgnor = new Control(li.node, 'span', 'symbol')
      const content = `${this.objBird[this.amount][this.randomIndexBirds[i]].name}`
      const pIgnor = new Control(li.node, 'p', 'options-bird__content', content)
      li.node.onclick = () => this.onChoise(event)
    }
  }

  initCardBird(img, name, nameLt, descript, index) {
    img.node.src = `${this.objBird[this.amount][this.randomIndexBirds[index]].image}`
    name.node.textContent = `${this.objBird[this.amount][this.randomIndexBirds[index]].name}`
    nameLt.node.textContent = `${this.objBird[this.amount][this.randomIndexBirds[index]].species}`
    descript.node.textContent = `${this.objBird[this.amount][this.randomIndexBirds[index]].description}`
  }

  initBottom() {
    const mainBtn = new Control(this.main.node, 'div', 'main__button-next')
    this.button = new Control(mainBtn.node, 'button', 'next')
    const buttonSpanIgnor = new Control(this.button.node, 'span', 'next__content', 'Далее')
    this.button.node.setAttribute('disabled', '')
    this.button.node.onclick = () => {
      this.onNext()
    }
  }
}
