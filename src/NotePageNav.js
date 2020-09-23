import React from 'react';
import NotefulContext from './Context'
import PropTypes from 'prop-types'

const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;

  render () {
    const { notes, folders } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)

  return (
    <div id="back-btn">
      <button onClick={() => this.props.history.goBack()}>	&#8592; Back</button>
      {folder && (
        <h3>
          {folder.name}
        </h3>
      )}
    </div>
  )
}
}

NotePageNav.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
