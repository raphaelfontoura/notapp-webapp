import "./styles.css";
import React, { useCallback, useEffect, useState } from 'react'
import NoteCard from "core/components/NoteCard";
import { NoteResponse } from "core/models/Note";
import { makePrivateRequest } from "core/utils/apiRequests";
import { toast } from "react-toastify";
import Pagination from "core/components/Pagination";


type Props = {}

const Notes = (props: Props) => {

  const [notesResponse, setNotesResponse] = useState<NoteResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  console.log(notesResponse);

  const getNotes = useCallback(() => {
    const params = {
      page,
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
    makePrivateRequest({ url: `/api/v1/notes/${nodeId}`, method: "DELETE" })
      .then(
        _response => {
          toast.success("Note erased.");
          getNotes()
        })
      .catch(err => {
        if (err.response.status === 401) toast.error("Please log in.");
        if (err.response.status === 400) toast.error("Something wrong. Aliens?")
      })
  }


  return (
    <>
      <div className='main-container'>
        {isLoading && (
          <div className="spinner-border text-primary fixed-top container mt-3">
            <span className="sr-only"></span>
          </div>
        )}
        {notesResponse?.content.map(note =>
          <NoteCard key={note.id} noteId={note.id} onClick={handleDelete}>
            {note.noteText}
          </NoteCard>
        )}
      </div>
      {notesResponse && (
        <Pagination activePage={page} totalPages={notesResponse.totalPages} onChange={p => setPage(p)} />
      )}
    </>
  )
}

export default Notes  