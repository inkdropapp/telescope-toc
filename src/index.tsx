import { TelescopeSourceToc, SOURCE_ID } from './toc-source.js'
import { EditorHeaderTOC } from './components/editor-header-toc.js'

class InkdropPlugin {
  private disposable: { dispose(): void } | null = null

  activate() {
    const source = new TelescopeSourceToc()
    inkdrop.telescope.registerSource(source)

    inkdrop.components.registerClass(EditorHeaderTOC, 'EditorHeaderTOC')
    inkdrop.layouts.insertComponentToLayoutBefore(
      'editor-header',
      'EditorHeaderMore',
      'EditorHeaderTOC'
    )

    this.disposable = inkdrop.commands.add(document.body, {
      'telescope-toc:show': () => {
        const itemId = TelescopeSourceToc.getCurrentSectionItemId()
        inkdrop.commands.dispatch(document.body, 'core:show-telescope', {
          scopedSourceId: SOURCE_ID,
          initialSelectedItemId: itemId,
          cancelBehavior: 'close'
        })
      }
    })
  }

  deactivate() {
    inkdrop.telescope.unregisterSource(SOURCE_ID)
    inkdrop.layouts.removeComponentFromLayout(
      'editor-header',
      'EditorHeaderTOC'
    )
    inkdrop.components.deleteClass(EditorHeaderTOC)
    if (this.disposable) {
      this.disposable.dispose()
      this.disposable = null
    }
  }
}

const plugin = new InkdropPlugin()
export default plugin
