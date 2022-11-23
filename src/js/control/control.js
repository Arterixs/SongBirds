export class Control {
  constructor(parentNode, tag = 'div', className = '', content = '') {
    const node = document.createElement(tag)
    node.className = className
    node.textContent = content
    if (parentNode) {
      parentNode.append(node)
    }
    this.node = node
  }

  destroy(node) {
    node.remove()
  }
}
