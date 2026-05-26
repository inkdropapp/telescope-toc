import type { Environment, IInkdropPlugin } from '@inkdropapp/types'
import { TelescopeSourceToc, SOURCE_ID } from './toc-source.js'
import { EditorHeaderTOC } from './components/editor-header-toc.js'
import { setEnv } from './env.js'

class InkdropPlugin implements IInkdropPlugin {
  private disposable: { dispose(): void } | null = null

  activate(app: Environment) {
    setEnv(app)

    const source = new TelescopeSourceToc()
    app.telescope.registerSource(source)

    app.components.registerClass(EditorHeaderTOC, 'EditorHeaderTOC')
    app.layouts.insertComponentToLayoutBefore(
      'editor-header',
      'EditorHeaderMore',
      'EditorHeaderTOC'
    )

    this.disposable = app.commands.add(document.body, {
      'telescope-toc:show': () => {
        const itemId = TelescopeSourceToc.getCurrentSectionItemId()
        app.commands.dispatch(document.body, 'core:show-telescope', {
          scopedSourceId: SOURCE_ID,
          initialSelectedItemId: itemId,
          cancelBehavior: 'close'
        })
      }
    })
  }

  deactivate(app: Environment) {
    app.telescope.unregisterSource(SOURCE_ID)
    app.layouts.removeComponentFromLayout('editor-header', 'EditorHeaderTOC')
    app.components.deleteClass(EditorHeaderTOC)
    if (this.disposable) {
      this.disposable.dispose()
      this.disposable = null
    }
    setEnv(undefined)
  }
}

export default new InkdropPlugin()
