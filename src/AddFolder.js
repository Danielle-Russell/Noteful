import React, { Component } from 'react';
import config from './config';
import NotefulContext from './Context';
import PropTypes from 'prop-types'

export default class AddFolder extends Component {

  static contextType = NotefulContext;

  addFolder = (folder_name) => {
    fetch(`${config.API_ENDPOINT}/api/folders`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({folder_name})
      }
    )
    .then(response => response.json())
    .then(responseJson=> this.context.addFolder(responseJson))
    .catch((error) => {
      this.setState({ hasError: true})
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    const newFolder = event.target.newFolder.value;
    this.addFolder(newFolder);
    this.props.history.goBack();
  }

  updateFolderName(e) {
    const newName = e.target.value;
      this.context.updateNewFolderName(newName);
  }

  validateFolderName() {
    if ( this.context.newFolder.folder_name.trim().length <= 3 ) {
    return 'Name must be more than 3 characters.'
    }
  }


  render() {
    console.log(this.context.newFolder)
    return (  

        <form id="note" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add A New Folder</h2>
        <label htmlFor="newFolder">
          Name:
        {this.context.newFolder.touched && (
          <p className="validate">{this.validateFolderName()}</p>
          )}  
        </label>
        <input
        type="text"
        folder_name="newFolder"
        id="newFolder"
        aria-required="true"
        aria-label="Name"
        onChange={(e) => this.updateFolderName(e)}/>
        <button type="submit" disabled={this.validateFolderName()}>Submit</button>
      </form>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object,
  folder_name: PropTypes.string.isRequired
}

AddFolder.defaultProps = {
    folder_name: ''
}