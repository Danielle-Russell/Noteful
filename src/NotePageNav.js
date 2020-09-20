import React from 'react'

export default function NotePageNav(props) {
  return (
    <div id="back-btn">
      <button onClick={() => props.history.goBack()}>	&#8592; Back</button>
      {props.folder && (
        <h3>
          {props.folder.name}
        </h3>
      )}
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}