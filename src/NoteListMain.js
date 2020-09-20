import React from 'react';
import Note from './Note';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'


export default function NoteListMain(props) {
  return (
    <section id="noteMain">
      <ul>
        {props.notes.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={<Moment>{note.modified}</Moment>}
            />
          </li>
        )}
      </ul>
      <div>
      <Link to="/add-note"><button id="add">Add Note</button></Link>
      </div>
    </section>
  )
}

NoteListMain.defaultProps = {
  notes: [],
}