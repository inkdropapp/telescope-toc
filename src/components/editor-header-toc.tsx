import { getEnv } from '../env.js'

export const EditorHeaderTOC = () => {
  const env = getEnv()
  const { AppHeaderButton } = env.components.classes
  if (!AppHeaderButton) return null

  const handleClick = () => {
    env.commands.dispatch(document.body, 'telescope-toc:show')
  }

  return (
    <AppHeaderButton
      title="Search outline"
      command="telescope-toc:show"
      icon="hash"
      className=""
      onClick={handleClick}
    />
  )
}
