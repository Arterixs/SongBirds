import { Control } from '../../control/control'
import { Model } from '../../model/model'
import { Audioplayer } from '../Game/Audioplayer'

export class GalleryPage extends Audioplayer {
  onClickInputVolume

  onClickInput

  onVolumeBtnClick

  onInputVolume

  onBackMenu

  onPlayGallery

  constructor(node) {
    super()
    this.node = node
    this.arrAudio = []
    this.model = new Model()
    this.initGallery()
  }

  initGallery() {
    const mainGallery = new Control(this.node, 'div', 'main-gallery')
    const h2Ignor = new Control(mainGallery.node, 'h2', 'title-gallery', 'Галерея')
    const divVolume = new Control(mainGallery.node, 'div', 'wrapper-volume')
    const GalleryBtnVolue = new Control(divVolume.node, 'button', 'play-volue')
    const gallerySpanVolue = new Control(GalleryBtnVolue.node, 'span', 'play-volue__img')
    const volumeGalleryInput = new Control(divVolume.node, 'input', 'volue-input')
    volumeGalleryInput.node.onclick = () => {
      this.onClickInputVolume(volumeGalleryInput.node)
    }
    volumeGalleryInput.node.oninput = () => {
      this.onInputVolume(volumeGalleryInput.node, gallerySpanVolue.node)
    }
    GalleryBtnVolue.node.onclick = () => {
      this.onVolumeBtnClick(volumeGalleryInput.node, gallerySpanVolue.node)
    }
    volumeGalleryInput.node.setAttribute('type', 'range')
    volumeGalleryInput.node.setAttribute('value', '50')
    const divCard = new Control(mainGallery.node, 'div', 'wrapper-cards')
    for (let i = 0; i < this.model.objBird.length; i++) {
      for (let j = 0; j < this.model.objBird.length; j++) {
        const cardWrap = new Control(divCard.node, 'div', 'cards-block')
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
        this.generateContent(cardImg, cardName, cardNameLat, descriptionBird, i, j)
        this.generateAudio(objectAudio, durationAltFinish, durationAltStart, audioplayerAlt, playerSpanAlt, i, j)
        this.arrAudio.push(objectAudio)
      }
    }
    const butonGallery = new Control(mainGallery.node, 'button', 'next')
    butonGallery.node.onclick = () => {
      this.onBackMenu()
    }
    const buttonSpanIgnor = new Control(butonGallery.node, 'span', 'text__content', 'Главное меню')
  }

  generateContent(img, name, nameLt, descript, i, j) {
    img.node.src = `${this.model.objBird[i][j].image}`
    name.node.textContent = `${this.model.objBird[i][j].name}`
    nameLt.node.textContent = `${this.model.objBird[i][j].species}`
    descript.node.textContent = `${this.model.objBird[i][j].description}`
  }

  generateAudio(audio, finish, start, input, span, i, j) {
    audio.src = `${this.model.objBird[i][j].audio}`
    audio.preload = 'metadata'
    audio.addEventListener('loadedmetadata', this.loadMetaGallery(audio, finish))
    audio.addEventListener('timeupdate', this.timeUpdateGallery(audio, start.node, input.node))
    audio.addEventListener('ended', this.audioEndGallery(audio, span.node, this.audioContext))
  }
}
