import React from 'react';
import NotefulContext from './Context';
import config from './config';
import PropTypes from 'prop-types';


class AddNotePage extends React.Component {

  static contextType = NotefulContext;

  addNewNote = note => {
console.log(note)
      note.modified = new Date(note.modified);
      fetch(`${config.API_ENDPOINT}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      })
        .then(response => {
          return response.json()
        })
        .then(responseJson => this.context.handleAddNote(responseJson))
        .catch((error) => {
          this.setState({hasError: true})
        });
    }
    parseFolders = () => {
      
        return this.context.folders.map(folder => (
         <option key={folder.id} name={folder.id} value={folder.id}>
            {folder.folder_name}
          </option>
        ))
      }

    
      handleFormSubmit = e => {
        e.preventDefault()
        const newNote = {
          note_name: e.target.note_name.value,
          content: e.target.content.value,
          folder_id: parseInt(e.target.folder_id.value),
          modified: new Date()
        }
        this.addNewNote(newNote)
        this.props.history.push('/');
       
      }
      validateName = () => {
        if (this.context.newNote.note_name.value.length === 0) {
          return 'Name is required'
        }
      }
    
      validateDescription = () => {
        if (this.context.newNote.content.value.length === 0) {
          return 'Content is required'
        }
      }

      validateFolderId = () => {
        if (this.context.newNote.folder_id.value.length === 0) {
          return 'Folder is required'
        }
      }


    
  render () {

return (

<div id="container">
    <form className="add-note" onSubmit={e => this.handleFormSubmit(e)}>
        <h2> New Note </h2>
        <label htmlFor="note_name">Title: {this.context.newNote.note_name.touched &&
        <p className="validate">{this.validateName()}</p>}</label>
        <input id="note_name" name="note_name" type="text" placeholder="name" onChange={e =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }/>
        <label htmlFor="content">Content: 
        {this.context.newNote.content.touched && 
              <p className="validate">{this.validateDescription()}</p>
            }</label>
        <input id="content" name="content" type="text" placeholder="content"  onChange={e =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }/>
        <label htmlFor="folder_id">Folder Name:
        <p className="validate">{this.validateFolderId()}</p>

</label>
        <select id="folder_id" name="folder_id" onChange={e =>
              this.context.updateNewNoteData(e.target.name, e.target.value)}>
       {this.parseFolders()}
       </select>
    <button disabled = {this.validateName()  || this.validateDescription()}>Add Note</button>
    </form>
</div>
)
}
}

AddNotePage.propTypes = {
   note_name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}

AddNotePage.defaultProps = {
    note_name: '',
    content: '',
  
}

export default AddNotePage