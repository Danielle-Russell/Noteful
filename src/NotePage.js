import React from 'react'
import Note from './Note'
import NotefulContext from './Context'
import PropTypes from 'prop-types'

const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

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
    const note = findNote(notes, noteId) || { content: '' }
  return (
    <section id="note-content">
      <Note
        id={note.id}
        name={note.name}
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
  match: PropTypes.object
}