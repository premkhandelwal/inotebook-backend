import AddNoteContext from "./addNoteContext";
import { useState } from "react";

// const [note, setNote] = useState({title:"", description: "",  tag: "personal"});



const note = { }



const AddNoteState = (props) => {
    return (
        <AddNoteContext.Provider value={{note}}>
          {props.children}
        </AddNoteContext.Provider>
      )
}

export default AddNoteState
