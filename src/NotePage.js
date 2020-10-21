import React from 'react'
import Note from './Note'
import NotefulContext from './Context'
import PropTypes from 'prop-types'

const findNote = (notes=[], noteId) => {
  return notes.find(note => note.id === Number (noteId))
}

export default class NotePage extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext

  deleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render () {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' };
    const notesId = parseInt(noteId)
 if (!findNote) {
   throw new Error();
 }

  return (
    
    <section id="note-content">
      <Note
        id={notesId}
        name={note.note_name}
        content={note.content}
        modified={note.modified}
        onDeleteNote = {this.deleteNote}
      />
      <div>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}

NotePage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  modified: PropTypes.string
}