import React from 'react';
import Store from './Store'

function AddNotePage (props) {
return (
<div id="container">
    <form className="add-note">
        <h2> New Note </h2>
        <label htmlFor="note-name">Title: </label>
        <input name="note-name" type="textarea" placeholder="name" />
        <label htmlFor="note-name">Content: </label>
        <input name="content" type="textarea" placeholder="content" />
        <label htmlFor="select">Folder Name:</label>
        <select name="select">
            {Store.folders.map(folder => {
        return <option>{folder.name}</option>
    })}
    </select>
    <button>Add Note</button>
    </form>
    <div id="back-btn">
      <button onClick={() => props.history.goBack()}>	&#8592; Back</button>
      {props.folder && (
        <h3>
          {props.folder.name}
        </h3>
      )}
    </div>
</div>
)
}

export default AddNotePage