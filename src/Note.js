import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from './Context';
import config from './config';
import PropTypes from 'prop-types'

const EmptyNote = () => {
  return <div></div>
}

export default class Note extends React.Component {

  static contextType = NotefulContext;

  handleClickDelete = e => {


    e.preventDefault();



    const noteId = Number(this.props.id)

  
  fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => {
      if (!res.ok)
        return res
        .then(e => Promise.reject(e))
      return res
    })
    .then(() => {
      this.context.deleteNote(noteId)
    }) 
    .catch(error => {
      console.log( {error} )
    })

    if (this.props) {
     
        this.props.deleteNote();
      
        
    }
}

      
  

render () {
  
  const { note_name, modified, id } = this.props;

  if (!id) {
    return <EmptyNote />
  }

  return (
    <div id="note">
      <div>
      <h2>
        <Link to={`/note/${id}`}>
          {note_name}
        </Link>
      </h2>
      </div>
      <div>
          Date Modified: 
          <br />
            {modified}
        </div>
        <div>
        <button type='button' id="delete" onClick={this.handleClickDelete}
        >
        Delete Note
      </button>

        </div>
      </div>
  )
}
}

Note.defaultProps = {
  note_name: ""
}

Note.propTypes = {
  onDeleteNote: PropTypes.func,
  id: PropTypes.number.isRequired,
  note_name: PropTypes.string.isRequired,
}