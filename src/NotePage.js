import React from 'react'
import Note from './Note'

export default function NotePageMain(props) {
  return (
    <section id="note-content">
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
      />
      <div>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}