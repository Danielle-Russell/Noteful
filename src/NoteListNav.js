import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import NotefulContext from './Context'

let countNotesForFolder = (notes = [], folderId) =>
notes.filter((note) => note.folderId === folderId).length;

export default class NoteListNav extends React.Component{

  
  static contextType = NotefulContext;

  static defaultProps = {
    folders: [],
    notes: []
  }

render () {
  const { folders=[], notes=[] } = this.context
  
  return (
    <div id="navs">
      <ul>
    
        {folders.map((folder, i) => 
        <li key={i}>
            <NavLink className="folder-link"
              to={`/folder/${folder.id}`}
            >
              {folder.name}
              
              <div id="number">
                {countNotesForFolder(notes, folder.id)}
              </div>
              </NavLink>
              </li>
            
               )} 
              </ul>
           
            <Link to="/add-folder"><button className="new-folder">New Folder</button></Link>
      </div>
)
}
}