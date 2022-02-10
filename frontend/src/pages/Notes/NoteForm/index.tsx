import "./styles.css";
import Button from 'core/components/Button';
import { Note } from 'core/models/Note'
import { makePrivateRequest } from 'core/utils/apiRequests';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

type ParamsId = {
  routeId: string;
}

const NoteForm = () => {

  const [note, setNote] = useState<Note>();
  const { routeId } = useParams<ParamsId>();

  useEffect(() => {
    makePrivateRequest({url:`/api/v1/notes/${routeId}`})
      .then(response => {
        setNote(response.data);
      })
  }, [routeId]);

  const handleSubmit = () => {
    console.log("Cliquei");
  }
  
  console.log(note?.noteText);

  return (
    <div className="container card-container-shadow">
      <textarea className="note-text-area" rows={16}>
        {note?.noteText}
      </textarea>
      <Button label='Save' onClick={handleSubmit}/>
    </div>
  )
}

export default NoteForm