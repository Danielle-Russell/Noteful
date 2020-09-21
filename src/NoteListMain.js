import React from 'react';
import Note from './Note';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import NotefulContext from './Context'

const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)


export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext;
  render () {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
  return (
    <section id="noteMain">
      <ul>
        {notesForFolder.map(note =>
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
}

