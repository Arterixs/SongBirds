import { Control } from '../../control/control'

export class GalleryContent {
  arrayAudio

  onPlayGallery

  onClickInput

  constructor(model, domElement, context) {
    this.model = model
    this.arrayAudio = []
    this.elem = domElement
    this.context = context
    this.initContent()
  }

  initContent() {
    for (let i = 0; i < this.model.objBird.length; i++) {
      for (let j = 0; j < this.model.objBird.length; j++) {
        const cardWrap = new Control(this.elem, 'div', 'cards-block')
        const objectAudio = new Audio()
        const infoCard = new Control(cardWrap.node, 'div', 'info__card info__card-gallery')
        const card = new Control(infoCard.node, 'div', 'card card-gallery')
        const cardImg = new Control(card.node, 'img', 'card__image card__image-gallery')
        cardImg.node.setAttribute('alt', 'bird')
        const cardContent = new Control(card.node, 'div', 'card-content card-content-gallery')
        const cardName = new Control(cardContent.node, 'p', 'card-content__name card_conntent__name-gallery')
        const cardNameLat = new Control(cardContent.node, 'p', 'card-content__en-name card-content__en-name-gallery')
        const cardControl = new Control(cardContent.node, 'div', 'card-control card-control-gallery')
        const playerButton = new Control(cardControl.node, 'button', 'play-btn')
        const playerSpanAlt = new Control(playerButton.node, 'span', 'play-btn__img')
        playerButton.node.onclick = () => {
          this.onPlayGallery(objectAudio, playerSpanAlt.node)
        }
        const audio = new Control(cardControl.node, 'div', 'audio')
        const audioplayerAlt = new Control(audio.node, 'input', 'audioplayer-small')
        audioplayerAlt.node.onclick = () => this.onClickInput(objectAudio, audioplayerAlt.node)
        audioplayerAlt.node.setAttribute('type', 'range')
        audioplayerAlt.node.setAttribute('value', '0')
        const duration = new Control(audio.node, 'div', 'duration-audio')
        const durationAltStart = new Control(duration.node, 'p', 'duration-audio__start', '00:00')
        const durationAltFinish = new Control(duration.node, 'p', 'duration-audio__finish', '00:00')
        const descriptionBird = new Control(infoCard.node, 'p', 'info__text info__text-gallery')
        this.context.generateContent(cardImg, cardName, cardNameLat, descriptionBird, i, j)
        this.context.generateAudio(objectAudio, durationAltFinish, durationAltStart, audioplayerAlt, playerSpanAlt, i, j)
        this.arrayAudio.push(objectAudio)
      }
    }
  }
}
