import { Win, Error } from '../../import-sound'

export class Audioplayer {
  constructor(songMystery, arrSongs, context) {
    this.context = context
    this.arrSongs = arrSongs
    this.audioMystery = new Audio(songMystery)
    this.audioMystery.preload = 'metadata'
    this.audioMystery.addEventListener('loadedmetadata', this.loadMeta(this.audioMystery, context))
    this.audioMystery.addEventListener('timeupdate', this.timeUpdate(this.audioMystery, context))
    this.audioMystery.addEventListener('ended', this.audioEnd(this.audioMystery, context, this))
    this.audioItem = new Audio()
    this.audioItem.preload = 'metadata'
    this.audioItem.addEventListener('loadedmetadata', this.loadMeta(this.audioItem, context, 'alt'))
    this.audioItem.addEventListener('timeupdate', this.timeUpdate(this.audioItem, context, 'alt'))
    this.audioItem.addEventListener('ended', this.audioEnd(this.audioItem, context, this, 'alt'))
    this.audioWin = new Audio(Win)
    this.audioError = new Audio(Error)
    this.isPlayGallery = 'false'
    this.audioContext = this
    this.clickBtnGallery = 'no'
  }

  audioChoise(ind) {
    this.stop(this.audioItem)
    const audioSrc = this.arrSongs[ind]
    this.audioItem.src = audioSrc
  }

  audioEnd(audio, context, contextClass, string) {
    return function () {
      let span
      if (!string) {
        context.playMystery = 'false'
        span = context.playerSpan.node
      } else {
        context.playMysteryAlt = 'false'
        span = context.playerSpanAlt.node
      }
      span.classList.remove('play')
      contextClass.stop(audio)
    }
  }

  audioEndGallery(audio, span, context) {
    return function () {
      span.classList.remove('play')
      context.stop(audio)
      context.isPlayGallery = 'false'
    }
  }

  timeUpdate(audio, context, string = '') {
    return function () {
      const duration = audio.duration
      const currentTime = audio.currentTime
      const progressPercent = (currentTime / duration) * 100
      let input
      let durStart
      if (!string) {
        input = context.audioplayer.node
        durStart = context.durationStart.node
      } else {
        input = context.audioplayerAlt.node
        durStart = context.durationAltStart.node
      }
      if (!Number.isNaN(duration)) {
        input.value = `${progressPercent}`
      } else {
        input.value = 0
      }
      input.style.background = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) ${progressPercent}%,
      rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%)`
      let totalMin = Math.floor(currentTime / 60)
      let totalSec = Math.floor(currentTime % 60)
      if (totalSec < 10) {
        totalSec = `0${totalSec}`
      }
      if (totalMin < 10) {
        totalMin = `0${totalMin}`
      }
      durStart.textContent = `${totalMin}:${totalSec}`
    }
  }

  timeUpdateGallery(audio, durStart, input) {
    return function () {
      const duration = audio.duration
      const currentTime = audio.currentTime
      const progressPercent = (currentTime / duration) * 100
      if (!Number.isNaN(duration)) {
        input.value = `${progressPercent}`
      } else {
        input.value = 0
      }
      input.style.background = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) ${progressPercent}%,
      rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%)`
      let totalMin = Math.floor(currentTime / 60)
      let totalSec = Math.floor(currentTime % 60)
      if (totalSec < 10) {
        totalSec = `0${totalSec}`
      }
      if (totalMin < 10) {
        totalMin = `0${totalMin}`
      }
      durStart.textContent = `${totalMin}:${totalSec}`
    }
  }

  loadMeta(audio, context, string = '') {
    return function () {
      let durFinish
      !string ? durFinish = context.durationFinish.node : durFinish = context.durationAltFinish.node
      const duration = audio.duration
      const totalMinute = Math.floor(duration / 60)
      let totalSecond = Math.floor(duration % 60)
      if (totalSecond < 10) {
        totalSecond = `0${totalSecond}`
      }
      durFinish.textContent = `${totalMinute}:${totalSecond}`
    }
  }

  loadMetaGallery(audio, durFinish) {
    return function () {
      const duration = audio.duration
      const totalMinute = Math.floor(duration / 60)
      let totalSecond = Math.floor(duration % 60)
      if (totalSecond < 10) {
        totalSecond = `0${totalSecond}`
      }
      durFinish.node.textContent = `${totalMinute}:${totalSecond}`
    }
  }

  removeAudio(string = '') {
    this.context.playerSpanAlt.node.classList.remove('play')
    this.context.playMysteryAlt = 'false'
    this.stop(this.audioItem)
    this.stop(this.audioError)
    if (string) {
      return
    }
    this.context.playMystery = 'false'
    this.context.playerSpan.node.classList.remove('play')
    this.stop(this.audioMystery)
  }

  removeAudioGallery(arrAudio, context) {
    context.isPlayGallery = 'false'
    arrAudio.forEach(el => context.stop(el))
  }

  removeAudioWin() {
    this.context.playerSpanAlt.node.classList.remove('play')
    this.context.playMysteryAlt = 'false'
    this.pause(this.audioItem)
    this.context.playMystery = 'false'
    this.context.playerSpan.node.classList.remove('play')
    this.pause(this.audioMystery)
  }

  play(audio) {
    audio.play()
  }

  pause(audio) {
    audio.pause()
  }

  stop(audio) {
    audio.pause()
    audio.currentTime = 0.0
  }
}
