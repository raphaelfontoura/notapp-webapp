import './styles.css';

import Button from 'core/components/Button';
import { makePrivateRequest } from 'core/utils/apiRequests';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ParamsId = {
  routeId: string;
}

const NoteForm = () => {

  const [text, setText] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      noteText: text
    };
    makePrivateRequest({ url: "api/v1/notes", method:"POST", data})
      .then(_response => {
        navigate("/notes");
      })
    console.log(text);
  }

  const handleChange = (event:any) => {
    setText(event.target.value);
  }

  return (
    <div className="container card-container-shadow">
      <textarea className="note-text-area" 
        rows={16} 
        value={text}
        onChange={handleChange}
        >
      </textarea>
      <Button label='Save' onClick={handleSubmit}/>
    </div>
  )
}

export default NoteForm