import React from 'react'
import type {
  TelescopeContext,
  TelescopeResult,
  TelescopeSourceItem
} from '@inkdropapp/types'
import { TelescopeSource } from 'inkdrop'
import { syntaxTree } from '@codemirror/language'
import { editorUtils } from 'inkdrop'
import { ListIcon, CheckIcon, TaskListCheckIcon } from './components/icons.js'

export const SOURCE_ID = 'toc'

interface TocItem {
  type: 'heading' | 'task'
  depth?: number
  text: string
  checked?: boolean
  line: number
}

export class TelescopeSourceToc extends TelescopeSource {
  id = SOURCE_ID
  name = 'Table of Contents'
  description = 'Search outline'
  defaultAlias = '#'

  isEnabled(): boolean {
    return !inkdrop.config.get(`telescope.sources.${this.id}.disabled`, false)
  }

  isAvailable(): boolean {
    return true
  }

  getItems({ query }: TelescopeContext): TelescopeResult {
    const { editingNote } = inkdrop.store.getState()
    if (!editingNote) return { options: [] }

    const tocItems = extractTocItems()
    let depth = 1

    const options = tocItems.map((item, index) => {
      let icon: () => React.ReactNode
      let type: string
      const label: string = item.text
      let prefix = ''

      if (item.type === 'heading') {
        depth = item.depth || 1
        prefix = '#'.repeat(depth)
        type = 'Heading'
        icon = () => <ListIcon />
      } else {
        type = 'Task Item'
        prefix = '-'.repeat(depth)
        icon = () => <CheckIcon checked={item.checked || false} />
      }

      return {
        id: `toc-${item.line}`,
        type,
        label,
        prefix,
        detail: `at line ${item.line}`,
        icon,
        source: this.id,
        actions: [
          {
            type: 'navigate',
            label: 'Navigate to Section'
          }
        ],
        boost: tocItems.length - index
      } as TelescopeSourceItem
    })

    return { options }
  }

  apply(item: TelescopeSourceItem, action: string): boolean {
    if (action === 'navigate') {
      const line = parseInt(item.id.replace('toc-', ''), 10)

      if (line > 0) {
        const { editor } = inkdrop.store.getState()

        if (editor.viewMode === 'preview') {
          inkdrop.commands.dispatch(
            document.body,
            'editor:scroll-preview-to-line',
            { line }
          )
        } else {
          const target = document.querySelector('.cm-editor') as HTMLElement
          if (target) {
            inkdrop.commands.dispatch(target, 'editor:jump-to-line', { line })
            inkdrop.commands.dispatch(document.body, 'editor:focus-mde')
          }
        }
      }
    }

    return true
  }

  getIcon() {
    return <TaskListCheckIcon />
  }

  static getCurrentSectionItemId(): string | null {
    const { editor } = inkdrop.store.getState()
    const cm = inkdrop.getActiveEditorOrThrowError()
    const tree = syntaxTree(cm.state)
    let line: number = 0

    if (editor.viewMode === 'preview') {
      const lineOnPreview = editorUtils.getLinePosOnPreview()
      if (!lineOnPreview) return null
      line = lineOnPreview
    } else {
      const cursorPos = cm.state.selection.main.head
      const lineObj = cm.state.doc.lineAt(cursorPos)
      line = lineObj.number
    }

    let currentSectionId: string | null = null

    tree.iterate({
      enter: ({ from, type }) => {
        const nodeLine = cm.state.doc.lineAt(from).number
        if (nodeLine > line) return false
        if (
          type.name.startsWith('ATXHeading') ||
          type.name.startsWith('SetextHeading')
        ) {
          currentSectionId = `toc-${nodeLine}`
        }
      }
    })

    return currentSectionId
  }
}

function extractTocItems(): TocItem[] {
  const cm = inkdrop.getActiveEditor()
  if (!cm) return []

  const tree = syntaxTree(cm.state)
  const { state } = cm
  const items: TocItem[] = []

  tree.iterate({
    enter: node => {
      const { from, to, type } = node
      const nodeLine = state.doc.lineAt(from).number

      const atxMatch = type.name.match(/^ATXHeading(\d)$/)
      const setextMatch = type.name.match(/^SetextHeading(\d)$/)

      if (atxMatch || setextMatch) {
        const depth = parseInt(atxMatch?.[1] || setextMatch?.[1] || '1', 10)
        const content = state.doc.sliceString(from, to)
        const text = content.replace(/^#+\s*/, '').replace(/\n=+$|\n-+$/, '')

        items.push({
          type: 'heading',
          depth,
          text: text.trim(),
          line: nodeLine
        })
      }

      if (type.name === 'Task') {
        const content = state.doc.sliceString(from, to)
        const markerMatch = content.match(/^\[([xX ])\]\s*/)
        if (markerMatch) {
          const checked = markerMatch[1].toLowerCase() === 'x'
          const text = content.slice(markerMatch[0].length)

          items.push({
            type: 'task',
            checked,
            text: text.trim(),
            line: nodeLine
          })
        }
      }
    }
  })

  return items.sort((a, b) => a.line - b.line)
}
