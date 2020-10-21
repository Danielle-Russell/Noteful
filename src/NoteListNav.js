import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import NotefulContext from './Context'

let countNotesForFolder = (notes = [], folder_id) =>
notes.filter((note) => note.folder_id === folder_id).length;

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
              {folder.folder_name}
              
              <div id="number">
                {countNotesForFolder(notes, folder.id)}
              </div>
              </NavLink>
              </li>
            
               )} 
                           <Link to="/add-folder"><button className="new-folder">New Folder</button></Link>

              </ul>
           
      </div>
)
}
}