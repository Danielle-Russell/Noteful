import React from 'react'
import { Link } from 'react-router-dom'


export default function Note(props) {
  return (
    <div id="note">
      <div>
      <h2>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      </div>
      <div>
          Date Modified: 
          <br />
            {props.modified}
        </div>
        <div>
        <button type='button' id="delete">
        Delete Note
      </button>
        </div>
      </div>
  )
}