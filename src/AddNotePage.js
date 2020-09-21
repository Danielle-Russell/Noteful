import React from 'react';
import NotefulContext from './Context'

class AddNotePage extends React.Component {

  static contextType = NotefulContext;
  render () {
    const { folders } = this.context
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
            {folders.map(folder => {
        return <option>{folder.name}</option>
    })}
    </select>
    <button>Add Note</button>
    </form>
</div>
)
}
}

export default AddNotePage