import { Control } from '@js/control/control'
import { GamePage } from '../components/Game/GamePage'
import { ResultPage } from '../components/Result/ResultPage'
import { GalleryPage } from '../components/Gallery/GalleryPage'
import { RulesPage } from '../components/Rules/RulesPage'

export class Application extends Control {
  objComponents

  arrElHeader

  constructor(parentNode, tag, className, options) {
    super(parentNode, tag, className)
    this.parentNode = parentNode
    this.options = options.components || []
    this.objComponents = {}
    this.startPageCycle()
    this.arrElHeader = []
    this.countOnChoise = 0
    this.attempt = 0
    this.liveChildStartPage = this.node.childNodes
    this.scoreValue = this.objComponents.header.scoreAmount.node
  }

  startPageCycle() {
    this.options.forEach(Component => {
      const component = new Component(this.node)
      component.render()
      this.objComponents[Component.name] = component
    })
    this.objComponents.main.onNewGame = (nodeRemove, nodeCreate) => {
      this.destroy(nodeRemove)
      this.gamePageCycle(nodeCreate)
    }

    this.objComponents.main.onRules = (nodeRemove, nodeCreate) => {
      this.destroy(nodeRemove)
      this.rulesCycle(nodeCreate)
    }

    this.objComponents.main.onGallery = (nodeRemove, nodeCreate) => {
      this.destroy(nodeRemove)
      this.galleryCycle(nodeCreate)
    }
  }

  gamePageCycle(nodeCreate) {
    const gamePage = new GamePage(nodeCreate)
    this.countOnChoise = 0
    const arrayOptions = gamePage.ul.node.childNodes
    const iconBtn = gamePage.playerSpan.node
    const iconBtnAlt = gamePage.playerSpanAlt.node
    const mainGame = gamePage.main.node
    const node = gamePage.node
    this.objComponents.header.score.node.classList.remove('none')
    this.scoreValue = this.objComponents.header.scoreAmount.node
    this.arrElHeader = this.objComponents.header.listProgress.node.childNodes
    this.arrElHeader[gamePage.amount].classList.add('active-chapter')

    gamePage.onNext = () => {
      this.countOnChoise = 0
      if (gamePage.amount === 5) {
        this.amount = 0
        this.arrElHeader.forEach(item => {
          item.classList.remove('active-chapter')
        })
        gamePage.audioUp.removeAudio()
        this.destroy(mainGame)
        this.objComponents.header.score.node.classList.add('none')
        this.resultCycle(node)
        return
      }
      gamePage.amount++
      gamePage.audioUp.removeAudio()
      gamePage.loadImage()
      gamePage.shuffle()
      gamePage.callAudio(gamePage)
      gamePage.win = 'false'
      gamePage.mainUpImages.node.src = gamePage.urlStandart
      gamePage.playerText.node.textContent = '******'
      gamePage.paragraph.node.classList.remove('none')
      gamePage.infoCard.node.classList.add('none')
      gamePage.button.node.setAttribute('disabled', '')
      while (gamePage.ul.node.firstChild) {
        this.destroy(gamePage.ul.node.firstChild)
      }
      gamePage.initVariant(gamePage.ul)
      this.arrElHeader.forEach((item, index) => {
        item.classList.remove('active-chapter')
        if (index === gamePage.amount) {
          item.classList.add('active-chapter')
        }
      })
    }

    gamePage.onChoise = event => {
      this.countOnChoise++
      gamePage.audioUp.removeAudio('alt')
      const span = event.currentTarget.firstChild
      gamePage.audioplayerAlt.node.style.background = `linear-gradient(to right, rgb(0, 188, 140)
      0%, rgb(61, 133, 140) 0%,rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%)`
      const cardName = gamePage.CardName
      const cardNameLt = gamePage.CardNameLat
      const cardDesc = gamePage.descriptionBird
      const cardImg = gamePage.CardImg
      const indexTarget = Array.from(arrayOptions).indexOf(event.currentTarget)
      gamePage.audioUp.audioChoise(indexTarget)
      const indexMystery = arrayOptions[gamePage.mysteryBirds]
      gamePage.initCardBird(cardImg, cardName, cardNameLt, cardDesc, indexTarget)
      if (this.countOnChoise === 1) {
        gamePage.paragraph.node.classList.add('none')
        gamePage.infoCard.node.classList.remove('none')
      }
      if (event.currentTarget === indexMystery) {
        if (gamePage.win !== 'true') {
          gamePage.audioUp.pause(gamePage.audioUp.audioMystery)
          gamePage.audioUp.play(gamePage.audioUp.audioWin)
          gamePage.button.node.removeAttribute('disabled')
          gamePage.audioUp.removeAudioWin()
          this.scoreValue.textContent = gamePage.scoring(this.countOnChoise)
        }
        gamePage.win = 'true'
        span.classList.add('true')
        gamePage.mainUpImages.node.src = gamePage.imageBird
        gamePage.playerText.node.textContent = gamePage.nameBird
      } else {
        if (span.classList.contains('false')) {
          this.countOnChoise--
          return
        }
        if (gamePage.win === 'false') {
          gamePage.audioUp.play(gamePage.audioUp.audioError)
          span.classList.add('false')
        }
      }
    }

    gamePage.onPlay = () => {
      const song = gamePage.audioUp.audioMystery
      const songAlt = gamePage.audioUp.audioItem
      if (gamePage.playMystery === 'false') {
        if (gamePage.playMysteryAlt === 'true') {
          gamePage.playMysteryAlt = 'false'
          iconBtnAlt.classList.remove('play')
          gamePage.audioUp.pause(songAlt)
        }
        gamePage.playMystery = 'true'
        iconBtn.classList.add('play')
        gamePage.audioUp.play(song)
      } else {
        gamePage.playMystery = 'false'
        iconBtn.classList.remove('play')
        gamePage.audioUp.pause(song)
      }
    }

    gamePage.onPlayAlt = () => {
      const song = gamePage.audioUp.audioMystery
      const songAlt = gamePage.audioUp.audioItem
      if (gamePage.playMysteryAlt === 'false') {
        if (gamePage.playMystery === 'true') {
          gamePage.playMystery = 'false'
          iconBtn.classList.remove('play')
          gamePage.audioUp.pause(song)
        }
        gamePage.playMysteryAlt = 'true'
        iconBtnAlt.classList.add('play')
        gamePage.audioUp.play(songAlt)
      } else {
        gamePage.playMysteryAlt = 'false'
        iconBtnAlt.classList.remove('play')
        gamePage.audioUp.pause(songAlt)
      }
    }

    gamePage.onClickInput = (audio, input) => {
      const range = input.node.value
      const cords = range / 100
      const duration = audio.duration
      audio.currentTime = cords * duration
    }

    gamePage.onClickInputVolume = (audioMain, audioAlt, input) => {
      const range = input.node.value
      const cords = range / 100
      if (cords < 0 || cords > 1) {
        return
      }
      audioMain.volume = cords
      audioAlt.volume = cords
    }

    gamePage.onInputVolume = (audioMain, audioAlt, input, icon) => {
      const range = input.node.value
      const cords = range / 100
      if (cords === 0) {
        gamePage.volumeOff = 'true'
        icon.node.classList.add('volume-off')
      } else {
        gamePage.volumeOff = 'false'
        icon.node.classList.remove('volume-off')
      }
      audioMain.volume = cords
      audioAlt.volume = cords
      localStorage.setItem('volume', input.node.value)
    }

    gamePage.onVolumeBtnClick = (audioMain, audioAlt, input, icon) => {
      const range = input.node.value
      if (gamePage.volumeOff === 'false') {
        gamePage.volumeOff = 'true'
        input.node.value = 0
        icon.node.classList.add('volume-off')
        localStorage.setItem('volume', range)
      } else {
        gamePage.volumeOff = 'false'
        input.node.value = 50
        icon.node.classList.remove('volume-off')
        input.node.value = localStorage.getItem('volume')
      }
      const value = input.node.value / 100
      audioMain.volume = value
      audioAlt.volume = value
    }
  }

  resultCycle(nodeCreate) {
    const resultPage = new ResultPage(nodeCreate, this.scoreValue)
    const mainBlock = resultPage.mainRes.node

    resultPage.onNewGame = () => {
      this.scoreValue.textContent = 0
      this.destroy(mainBlock)
      this.gamePageCycle(resultPage.node)
    }

    resultPage.onMenu = () => {
      this.scoreValue.textContent = 0
      const arrayComponents = Array.from(this.liveChildStartPage)
      arrayComponents.forEach(component => {
        this.destroy(component)
      })
      this.startPageCycle()
    }
  }

  galleryCycle(nodeCreate) {
    const galleryPage = new GalleryPage(nodeCreate)
    const galleryContent = galleryPage.content
    this.objComponents.header.headerLine.node.classList.add('none')
    this.objComponents.header.header.node.classList.add('margin-none')
    this.objComponents.header.headerLogo.node.classList.add('margin-none')
    const arrayAudio = galleryContent.arrayAudio
    const arrAudioPlay = []
    const arrSpanPlay = []

    galleryPage.onBackMenu = () => {
      const arrayComponents = Array.from(this.liveChildStartPage)
      arrayComponents.forEach(component => {
        this.destroy(component)
      })
      arrAudioPlay.length = 0
      arrSpanPlay.length = 0
      galleryPage.removeAudioGallery(arrayAudio, galleryPage.audioContext)
      this.startPageCycle()
    }

    galleryContent.onPlayGallery = (audio, span) => {
      if (arrAudioPlay.length > 1) {
        arrAudioPlay.shift()
        arrSpanPlay.shift()
      }
      arrAudioPlay.push(audio)
      arrSpanPlay.push(span)
      if (galleryPage.isPlayGallery === 'false') {
        galleryPage.isPlayGallery = 'true'
        galleryPage.play(audio)
        span.classList.add('play')
      } else {
        if (arrAudioPlay.length > 1) {
          if (arrAudioPlay[0] !== arrAudioPlay[1]) {
            galleryPage.pause(arrAudioPlay[0])
            arrSpanPlay[0].classList.remove('play')
            galleryPage.play(audio)
            span.classList.add('play')
            return
          } else {
            galleryPage.isPlayGallery = 'false'
            galleryPage.pause(audio)
            span.classList.remove('play')
            return
          }
        }
        galleryPage.isPlayGallery = 'false'
        galleryPage.pause(audio)
        span.classList.remove('play')
      }
    }

    galleryContent.onClickInput = (audio, input) => {
      const range = input.value
      const cords = range / 100
      const duration = audio.duration
      audio.currentTime = cords * duration
    }

    galleryPage.onClickInputVolume = input => {
      const range = input.value
      const cords = range / 100
      if (cords < 0 || cords > 1) {
        return
      }
      arrayAudio.forEach(el => el.volume = cords)
    }

    galleryPage.onInputVolume = (input, icon) => {
      const range = input.value
      const cords = range / 100
      if (cords === 0) {
        galleryPage.model.volumeOff = 'true'
        icon.classList.add('volume-off')
      } else {
        galleryPage.model.volumeOff = 'false'
        icon.classList.remove('volume-off')
      }
      arrayAudio.forEach(el => el.volume = cords)
    }

    galleryPage.onVolumeBtnClick = (input, icon) => {
      const range = input.value
      if (galleryPage.model.volumeOff === 'false') {
        galleryPage.model.volumeOff = 'true'
        input.value = 0
        icon.classList.add('volume-off')
        localStorage.setItem('volumeGallery', range)
      } else {
        galleryPage.model.volumeOff = 'false'
        input.value = 50
        icon.classList.remove('volume-off')
        input.value = localStorage.getItem('volumeGallery')
      }
      const value = input.value / 100
      arrayAudio.forEach(el => el.volume = value)
    }
  }

  rulesCycle(nodeCreate) {
    const rulesPage = new RulesPage(nodeCreate)

    rulesPage.onBack = () => {
      const arrayComponents = Array.from(this.liveChildStartPage)
      arrayComponents.forEach(component => {
        this.destroy(component)
      })
      this.startPageCycle()
    }

    rulesPage.onGame = () => {
      this.destroy(rulesPage.main.node)
      this.gamePageCycle(nodeCreate)
    }
  }
}
