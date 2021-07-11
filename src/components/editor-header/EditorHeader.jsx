import { Avatar } from '@material-ui/core'
import appIcon from '../../assets/app-icon.svg'
import EditorHeaderMenuBar from './EditorHeaderMenuBar'

const EditorHeader = ({ title = 'Untitled Document' }) => {
  return <div className="flex items-center h-16 bg-white border-b">
    <div className="px-4">
      <a href="/" className="h-11 w-11 flex items-center justify-center">
        <img className="h-9" src={appIcon} alt="" />
      </a>
    </div>
    <div className="flex-1">
      <h1 className="text-lg font-medium">{title}</h1>
      <div>
        <EditorHeaderMenuBar />
      </div>
    </div>
    <div className="px-4">
      <Avatar className="m-1 h-8 w-8">A</Avatar>
    </div>
  </div>
}

export default EditorHeader
