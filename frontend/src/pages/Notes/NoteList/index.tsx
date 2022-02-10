import "./styles.css";
import React, { useCallback, useEffect, useState } from 'react'
import NoteCard from "core/components/NoteCard";
import { NoteResponse } from "core/models/Note";
import { makePrivateRequest } from "core/utils/apiRequests";
import { Link } from "react-router-dom";
import Button from "core/components/Button";

type Props = {}

const Notes = (props: Props) => {

  const [notesResponse, setNotesResponse] = useState<NoteResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const getNotes = useCallback(() => {
    const params = {
      page: page,
      size: 4
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
  }, [page]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const handleDelete = (nodeId: number) => {
    makePrivateRequest({ url: `/api/v1/notes/${nodeId}`, method: "DELETE"})
      .then(
        _response => getNotes()
      )
  }


  return (
    <>
      <Link to={"new"}>
        <button className="btn btn-primary" id="btn-new-note"> Create Note </button>
      </Link>
      <div className='main-container'>
        {isLoading && (
          <div className="spinner-border text-primary">
            <span className="sr-only"></span>
          </div>
        )}
        {notesResponse?.content.map(note =>
          <NoteCard key={note.id} noteId={note.id} onClick={handleDelete}>
            {note.noteText}
          </NoteCard>
        )}
      </div>
    </>
  )
}

export default Notes  