import React from 'react'
import { NavLink, Link } from 'react-router-dom'


export default function NoteListNav(props) {

    let countNotesForFolder = (notes = [], folderId) =>
    notes.filter((note) => note.folderId === folderId).length;

  return (
    <div id="navs">
      <ul>
        {props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink className="folder-link"
              to={`/folder/${folder.id}`}
            >
              {folder.name}
            </NavLink>
            <div id="number">
                {countNotesForFolder(props.notes, folder.id)}
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

NoteListNav.defaultProps = {
  folders: []
}