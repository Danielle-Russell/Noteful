import React from 'react';

function FormPage (props) {
    return (
        <div id="container">
             <div id="back-btn">
      <button onClick={() => props.history.goBack()}>&#8592; Back</button>
      {props.folder && (
        <h3>
          {props.folder.name}
        </h3>
      )}
    </div>
    <div>
      <form id="note">
          <h2>New Folder</h2>
        <label htmlFor="name">Folder Name</label>
        <input name="name"type="textarea" placeholder="name"></input>
        <button type="submit">Add Folder</button>
      </form>
      </div>
      </div>
    )
    }

    export default FormPage