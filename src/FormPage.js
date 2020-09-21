import React from 'react';

function FormPage (props) {
    return (
        <div id="container">
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