import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "617babdd6590bb13b5ff8813",
          "user": "617b773c848c8cff888c6f53",
          "title": "First Note",
          "description": "This is my first note",
          "tag": "personal",
          "date": "2021-10-29T08:07:57.345Z",
          "__v": 0
        },
        {
          "_id": "617babed6590bb13b5ff8815",
          "user": "617b773c848c8cff888c6f53",
          "title": "Second Note",
          "description": "This is my second note",
          "tag": "personal",
          "date": "2021-10-29T08:08:13.336Z",
          "__v": 0
        },
        {
          "_id": "617babdd6590bb13b5ff8813",
          "user": "617b773c848c8cff888c6f53",
          "title": "First Note",
          "description": "This is my first note",
          "tag": "personal",
          "date": "2021-10-29T08:07:57.345Z",
          "__v": 0
        },
        {
          "_id": "617babed6590bb13b5ff8815",
          "user": "617b773c848c8cff888c6f53",
          "title": "Second Note",
          "description": "This is my second note",
          "tag": "personal",
          "date": "2021-10-29T08:08:13.336Z",
          "__v": 0
        },
        {
          "_id": "617babdd6590bb13b5ff8813",
          "user": "617b773c848c8cff888c6f53",
          "title": "First Note",
          "description": "This is my first note",
          "tag": "personal",
          "date": "2021-10-29T08:07:57.345Z",
          "__v": 0
        },
        {
          "_id": "617babed6590bb13b5ff8815",
          "user": "617b773c848c8cff888c6f53",
          "title": "Second Note",
          "description": "This is my second note",
          "tag": "personal",
          "date": "2021-10-29T08:08:13.336Z",
          "__v": 0
        },
      ];
      const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState