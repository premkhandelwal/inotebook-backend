import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial)

  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Yjc3M2M4NDhjOGNmZjg4OGM2ZjUzIn0sImlhdCI6MTYzNTQ4NDk1Nn0.1oQzzswpwiyXw6a-4waUfwF3ueRSOlI8SyVBgmE0cqI'
      },
    });
    const json =await response.json();

    console.log(json);
    setNotes(json)
  }

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Yjc3M2M4NDhjOGNmZjg4OGM2ZjUzIn0sImlhdCI6MTYzNTQ4NDk1Nn0.1oQzzswpwiyXw6a-4waUfwF3ueRSOlI8SyVBgmE0cqI'
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Yjc3M2M4NDhjOGNmZjg4OGM2ZjUzIn0sImlhdCI6MTYzNTQ4NDk1Nn0.1oQzzswpwiyXw6a-4waUfwF3ueRSOlI8SyVBgmE0cqI'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    let newNotes= JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
      newNotes[index] = element;

    }

    setNotes(newNotes);



  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Yjc3M2M4NDhjOGNmZjg4OGM2ZjUzIn0sImlhdCI6MTYzNTQ4NDk1Nn0.1oQzzswpwiyXw6a-4waUfwF3ueRSOlI8SyVBgmE0cqI'
      },
      body: JSON.stringify({ id })
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
    console.log("Deleting the note with id " + id);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote,  editNote, deleteNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState