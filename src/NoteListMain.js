import React from 'react';
import Note from './Note';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import NotefulContext from './Context'
import PropTypes from 'prop-types'


const getNotesForFolder = (notes=[], folder_id) => (
  (!folder_id) 
    ? notes
    : notes.filter(note => note.folder_id === folder_id)
)




export default class NoteListMain extends React.Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  deleteNote = noteId => {
    this.props.history.push(`/`)
  }

  static contextType = NotefulContext;
  
  render () {
    const { folder_id } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folder_id) 
  return (

    <section id="noteMain">
      <ul>
        {notesForFolder.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              note_name={note.note_name}
              content={note.content}
              modified={<Moment>{note.modified}</Moment>}
              folder_id={note.folder_id}
              deleteNote={this.deleteNote}
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

NoteListMain.propTypes = {
  match: PropTypes.object
}