import { Control } from '../../control/control'
import { gitLogo, schoolLogo } from '../../import-asset'

export class StartFooter {
  static name = 'footer'

  footer

  constructor(node) {
    this.node = node
  }

  render() {
    this.footer = new Control(this.node, 'footer', 'footer')
    const footerWrap = new Control(this.footer.node, 'div', 'footer__wrap')
    const linkGit = new Control(footerWrap.node, 'a', 'link')
    linkGit.node.setAttribute('href', 'https://github.com/Arterixs')
    const imgGit = new Control(linkGit.node, 'img', 'git-logo')
    imgGit.node.setAttribute('alt', 'github')
    imgGit.node.setAttribute('src', `${gitLogo}`)
    const yearTimeIgnor = new Control(footerWrap.node, 'p', 'years', '2022')
    const linkRs = new Control(footerWrap.node, 'a', 'link')
    linkRs.node.setAttribute('href', 'https://rs.school/js/')
    const imgRs = new Control(linkRs.node, 'img', 'rs-logo')
    imgRs.node.setAttribute('alt', 'rs-school')
    imgRs.node.setAttribute('src', `${schoolLogo}`)
  }
}
