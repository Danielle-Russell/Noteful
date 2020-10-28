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

   

  deleteNote = noteId => {
    this.props.history.push(`/`)
  }

  static contextType = NotefulContext

  

  render () {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' };
 if (!findNote) {
   throw new Error();
 }

 
  return (
    
    <section id="note-content">
      <Note
        id={Number(noteId)}
        note_name={note.note_name}
        content={note.content}
        modified={note.modified}
        folder_id={note.folder_id}
        deleteNote={this.deleteNote}
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