import React from 'react'
import { Menu, MenuItem, Fade } from '@material-ui/core'

const EditorHeaderMenuBarButtonMenu = React.forwardRef(({ children, anchorEl, onClose: handleClose }, ref) => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(Boolean(anchorEl))
  }, [anchorEl])

  if (!open) return null

  return <Menu
    id="fade-menu"
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'bottom' }}
    keepMounted
    open={open}
    onClose={handleClose}
    TransitionComponent={Fade}
    ref={ref}
  >
    <MenuItem onClick={handleClose}>Profile</MenuItem>
    <MenuItem onClick={handleClose}>My account</MenuItem>
    <MenuItem onClick={handleClose}>Logout</MenuItem>
  </Menu>

  // return <div className="fixed bg-white shadow-lg rounded-lg border overflow-hidden">
  //   {children}
  // </div>
})

EditorHeaderMenuBarButtonMenu.displayName = 'EditorHeaderMenuBarButtonMenu'

export default EditorHeaderMenuBarButtonMenu
