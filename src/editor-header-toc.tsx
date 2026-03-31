import { HashIcon } from './components/icons.js'

export const EditorHeaderTOC = () => {
  const AppHeaderButton =
    inkdrop.components.getComponentClass('AppHeaderButton')
  if (!AppHeaderButton) return null

  const handleClick = () => {
    inkdrop.commands.dispatch(document.body, 'telescope-toc:show')
  }

  return (
    <AppHeaderButton
      title="Search outline"
      command="telescope-toc:show"
      className=""
      onClick={handleClick}
    >
      <HashIcon />
    </AppHeaderButton>
  )
}
