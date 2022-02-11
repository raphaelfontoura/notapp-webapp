import './styles.css';

import Button from 'core/components/Button';
import { makePrivateRequest } from 'core/utils/apiRequests';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const NoteForm = () => {

  const [text, setText] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      noteText: text
    };
    makePrivateRequest({ url: "api/v1/notes", method:"POST", data})
      .then(_response => {
        toast.success("You note has saved!");
        navigate("/notes");
      })
      .catch( (err) => {
        if (err.response.status === 400) toast.error("Some field is empty or invalid. Please verify.");
        if (err.response.status === 401) {
          toast.error("Please, log in.");
          navigate("/");
        };
      })
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