import React from 'react';
import NotefulContext from './Context'
import PropTypes from 'prop-types'

const findFolder = (folders=[], folder_id) =>
  folders.find(folder => folder_id === folder.id)
  

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
    const note = findNote(notes, Number (noteId)) || {}
    const folder = findFolder(folders, note.folder_id)

  return (
    <div id="back-btn">
      <button onClick={() => this.props.history.goBack()}>	&#8592; Back</button>
      {folder && (
        <h3>
          {folder.folder_name}
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
