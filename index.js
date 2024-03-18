import { Editor } from 'bytemd'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

export default function BytemdPaste({ target, props }) {
  // init Editor
  const editor = new Editor({
    target,
    props
  })

  // don't escape html
  TurndownService.prototype.escape = s => s

  // html to md
  const turndownService = new TurndownService({
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*'
  })

  turndownService.use(gfm)

  // paste transform
  editor.$$.root?.querySelector('.CodeMirror')?.addEventListener(
    'paste',
    e => {
      if (e.clipboardData?.types.includes('text/html')) {
        e.preventDefault()
        const html = e.clipboardData.getData('text/html')
        const mark = turndownService.turndown(html)
        document.execCommand('insertHTML', false, escapeHTML(mark))
      }
    },
    true
  )

  // status chars
  if (editor.$$.root?.querySelector('.bytemd-status-left')) {
    const span = document.createElement('span')
    const chars = props?.locale?.chars || 'Chars'
    const text = document.createTextNode(chars + ': ')
    const strong = document.createElement('strong')
    strong.textContent = props?.value?.length ?? ''
    span.appendChild(text)
    span.appendChild(strong)
    editor.$$.root.querySelector('.bytemd-status-left').prepend(span)
    editor.$on('change', e => {
      strong.textContent = e.detail.value.length
    })
  }

  function escapeHTML(e) {
    return String(e)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  return editor
}
