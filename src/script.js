import './assets/images/ico/favicon.ico'
import { Application } from '@js/application/application'
import { Control } from './js/control/control'
import { StartHeader } from './js/components/startPage/StartHeader'
import { StartMain } from './js/components/startPage/StartMain'
import { StartFooter } from './js/components/startPage/StartFooter'
import './style.scss'

(function applicated() {
  const init = new Control(document.body, 'div', 'app')
  const appIgnor = new Application(init.node, 'div', 'app__wrap', { components: [StartHeader, StartMain, StartFooter] })
  if (!localStorage.getItem('volume')) {
    localStorage.setItem('volume', 50)
  }
}())
