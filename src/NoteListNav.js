import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import NotefulContext from './Context'

let countNotesForFolder = (notes = [], folderId) =>
notes.filter((note) => note.folderId === folderId).length;

export default class NoteListNav extends React.Component{
  static contextType = NotefulContext;

render () {
  const { folders=[], notes=[] } = this.context

  return (
    <div id="navs">
      <ul>
        {folders.map(folder =>
          <li key={folder.id}>
            <NavLink className="folder-link"
              to={`/folder/${folder.id}`}
            >
              {folder.name}
            </NavLink>
            <div id="number">
                {countNotesForFolder(notes, folder.id)}
              </div>
          </li>
        )}
         <Link to="/add-folder"><button>New Folder</button></Link>
      </ul>
      <div>
      </div>
    </div>
  )
}
}
