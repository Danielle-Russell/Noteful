import React from 'react';
import NotefulContext from './Context';
import config from './config';
import PropTypes from 'prop-types';


class AddNotePage extends React.Component {

  static contextType = NotefulContext;

  addNewNote = note => {
      note.modified = new Date(note.modified);
      fetch(`${config.API_ENDPOINT}/notes`, {
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
            {folder.name}
          </option>
        ))
      }

    
      handleFormSubmit = e => {
        e.preventDefault()
        const newNote = {
          name: e.target.name.value,
          content: e.target.content.value,
          folderId: e.target.folder_id.value,
          modified: new Date(),
        }
        this.addNewNote(newNote)
        this.props.history.push('/');
      }
      validateName = () => {
        if (this.context.newNote.name.value.length === 0) {
          return 'Name is required'
        }
      }
    
      validateDescription = () => {
        if (this.context.newNote.content.value.length === 0) {
          return 'Content is required'
        }
      }
    
    
  render () {
    console.log(this.context.newNote)
    
return (
<div id="container">
    <form className="add-note" onSubmit={e => this.handleFormSubmit(e)}>
        <h2> New Note </h2>
        <label htmlFor="name">Title: {this.context.newNote.name.touched &&
        <p className="validate">{this.validateName()}</p>}</label>
        <input id="name" name="name" type="text" placeholder="name" onChange={e =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }/>
        <label htmlFor="content">Content: </label>
        {this.context.newNote.content.touched && (
              <p className="validate">{this.validateDescription()}</p>
            )}
        <input name="content" type="textarea" placeholder="content"  onChange={e =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }/>
        <label htmlFor="folder_id">Folder Name:
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
   name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired
}

AddNotePage.defaultProps = {
    name: '',
    content: '',
    folderId: ''
}

export default AddNotePage