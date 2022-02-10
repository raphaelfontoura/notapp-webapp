import "./styles.css";
import React from 'react';

type Props = {
  children: string
}

function NoteCard({ children }: Props) {
  return (
    <div className="card-container-shadow note-card">
        <div className="buttons-notes">
          <span>edit</span>
          <span>delete</span>
        </div>
        <div className="line-divisor"></div>
        <div className="card-note-text">
          {children}
        </div>
      </div>
  )
}

export default NoteCard