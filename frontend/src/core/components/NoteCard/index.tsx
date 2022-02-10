import "./styles.css";
import React from 'react';

type Props = {
  noteId: number;
  children: string;
  onClick: (noteId: number) => void;
}

function NoteCard({ children, noteId, onClick }: Props) {

  const handleClick = () => {
    onClick(noteId);
  }

  return (
    <div className="card-container-shadow note-card">
      <div className="buttons-notes">
        <button className="btn btn-outline-danger" onClick={handleClick}>delete</button>
      </div>
      <div className="line-divisor"></div>
      <div className="card-note-text">
        {children}
      </div>
    </div>
  )
}

export default NoteCard