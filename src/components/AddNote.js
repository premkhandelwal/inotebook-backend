import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';



export const AddNote = (props) => {
    
    const context = useContext(noteContext);
    const {  addNote } = context;

const [note, setNote] = useState({title:"", description: "",  tag: "personal"});

    

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added Successfully", "success")
        setNote({title:"", description: "",  tag: "personal"})
    }
    
    const handleonChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


    
    return (
        <div className="container my-3" >
            <h2>Add a Note</h2>
            <form className = "my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" >Title address</label>
                    <input type="text" className="form-control" id="title" name = "title"  onChange = {handleonChange} minLength = {5} required value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" >Description</label>
                    <input type="text" className="form-control" id="description" name = "description" onChange = {handleonChange} minLength = {5} required value={note.description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" >Tag</label>
                    <input type="text" className="form-control" id="tag" name = "tag" onChange = {handleonChange} minLength = {5} required value={note.tag} />
                </div>
               
                <button disabled  = {note.title.length <5 || note.description.length <5 } type="submit" className="btn btn-primary" onClick = {handleClick}>Add Note </button>
            </form>
            </div>
    )
}
