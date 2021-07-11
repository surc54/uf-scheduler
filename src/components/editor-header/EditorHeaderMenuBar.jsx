import React from 'react'
import EditorHeaderMenuBarButton from './EditorHeaderMenuBarButton'
import { MenuItem } from '@material-ui/core'
import EditorHeaderMenuBarButtonMenu from './EditorHeaderMenuBarButtonMenu'

/**
 * File
 *   - Share
 *   - New
 *   - Open
 *   - Download
 *   - Rename
 *   - Delete
 *   - Details/Properties
 *   - Print
 *
 * Edit
 *   - Undo
 *   - Redo
 *   - Clear all
 *
 * View
 *   - Edit mode
 *   - Present mode
 *   - Fullscreen
 *
 * Help
 *   - Contact developer
 */

const EditorHeaderMenuBar = () => {
  const refs = {
    file: React.useRef(),
    edit: React.useRef(),
    view: React.useRef(),
    help: React.useRef()
  }
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClose = () => { setAnchorEl(null) }
  const handleOpen = (e) => {
    if (!anchorEl)
      setAnchorEl(e.currentTarget)
    else handleClose()
  }

  return <div className="-ml-2">
    <EditorHeaderMenuBarButton onClick={handleOpen} ref={refs.file}>File</EditorHeaderMenuBarButton>
    <EditorHeaderMenuBarButton onClick={handleOpen} ref={refs.edit}>Edit</EditorHeaderMenuBarButton>
    <EditorHeaderMenuBarButton onClick={handleOpen} ref={refs.view}>View</EditorHeaderMenuBarButton>
    <EditorHeaderMenuBarButton onClick={handleOpen} ref={refs.help}>Help</EditorHeaderMenuBarButton>
    <EditorHeaderMenuBarButtonMenu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorPosition="bottom"
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </EditorHeaderMenuBarButtonMenu>
  </div>
}

export default EditorHeaderMenuBar
