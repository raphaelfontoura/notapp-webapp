import "./styles.css";
import React from 'react';

type Props = {
  noteId: number;
  children: string;
}

function NoteCard({ children, noteId }: Props) {
  return (
    <div className="card-container-shadow note-card">
        <div className="buttons-notes">
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