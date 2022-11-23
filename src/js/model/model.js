import { Audioplayer } from '../components/Game/Audioplayer'
import { birdsData } from '../data/data'

export class Model {
  score

  constructor() {
    this.objBird = birdsData
    this.birdsCount = this.objBird.length
    this.randomIndexBirds = []
    this.audioIndexBirds = []
    this.amount = 0
    this.nameBird = ''
    this.mysteryBirds = 0
    this.imageBird = ''
    this.win = 'false'
    this.score = 0
    this.arr = new Array(birdsData.length)
    this.playMystery = 'false'
    this.playMysteryAlt = 'false'
    this.audioBirdMystery = ''
    this.audioUp = ''
    this.context = this
    this.volumeOff = 'false'
  }

  loadImage() {
    for (let i = 0; i < birdsData.length; i++) {
      this.arr[i] = new Image()
      this.arr[i].src = birdsData[this.amount][i].image
    }
  }

  shuffle() {
    this.mysteryIndex = Math.floor(Math.random() * this.birdsCount)
    this.nameBird = this.objBird[this.amount][this.mysteryIndex].name
    this.imageBird = this.objBird[this.amount][this.mysteryIndex].image
    this.randomIndexBirds.length = 0
    let j = 0
    let temp = 0
    for (let i = 0; i < this.birdsCount; i += 1) {
      this.randomIndexBirds.push(i)
    }
    for (let k = this.randomIndexBirds.length - 1; k > 0; k -= 1) {
      j = Math.floor(Math.random() * (k + 1))
      temp = this.randomIndexBirds[j]
      this.randomIndexBirds[j] = this.randomIndexBirds[k]
      this.randomIndexBirds[k] = temp
    }
    this.mysteryBirds = this.randomIndexBirds.indexOf(this.mysteryIndex)
  }

  callAudio(context) {
    this.audioIndexBirds.length = 0
    for (let i = 0; i < this.birdsCount; i++) {
      const audioIndex = this.objBird[this.amount][this.randomIndexBirds[i]].audio
      this.audioIndexBirds.push(audioIndex)
    }
    this.audioBirdMystery = this.objBird[this.amount][this.mysteryIndex].audio
    this.audioUp = new Audioplayer(this.audioBirdMystery, this.audioIndexBirds, context)
  }

  scoring(count) {
    this.score += this.birdsCount - count
    return this.score
  }
}
