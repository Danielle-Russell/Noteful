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
        {folders.map(folder => 
            <NavLink className="folder-link"
              to={`/folder/${folder.id}`}
            >
              <ul>
                <li key={folder.id}>
              {folder.name}
              <div id="number">
                {countNotesForFolder(notes, folder.id)}
              </div>
              </li>
              </ul>
            </NavLink>
            )}
            <Link to="/add-folder"><button className="new-folder">New Folder</button></Link>
      </div>
)
}
}