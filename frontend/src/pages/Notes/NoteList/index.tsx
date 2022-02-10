import "./styles.css";
import React, { useEffect, useState } from 'react'
import NoteCard from "core/components/NoteCard";
import { NoteResponse } from "core/models/Note";
import { makePrivateRequest } from "core/utils/apiRequests";
import { Link } from "react-router-dom";

type Props = {}

const Notes = (props: Props) => {

  const [notesResponse, setNotesResponse] = useState<NoteResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = {
      page: 0,
      size: 2
    }
    setIsLoading(true);
    try {
      makePrivateRequest({ url: "/api/v1/notes", params })
        .then(
          response => setNotesResponse(response.data)
        )
        .finally(() => {
          setIsLoading(false)
        })
    } catch (err) {
      console.log(err);
    }
  }, []);


  return (
    <div className='main-container'>
      {notesResponse?.content.map(note =>
        <Link to={`${note.id}`} key={note.id}>
          <NoteCard key={note.id} noteId={note.id}>{note.noteText}</NoteCard>
        </Link>
      )}
    </div>
  )
}

export default Notes  