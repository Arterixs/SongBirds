import { Control } from '../../control/control'
import { Model } from '../../model/model'
import { Audioplayer } from '../Game/Audioplayer'
import { GalleryContent } from './GalleryContent'

export class GalleryPage extends Audioplayer {
  content

  onClickInputVolume

  onVolumeBtnClick

  onInputVolume

  onBackMenu

  constructor(node) {
    super()
    this.node = node
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
    this.content = new GalleryContent(this.model, divCard.node, this)
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
