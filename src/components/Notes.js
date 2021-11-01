import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { AddNote } from './AddNote';
import { useHistory } from 'react-router';

export const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token') != null){

            fetchNotes();
        }else{
            history.push("/login")
        }
    });

    const ref = useRef(null);
    const refClose = useRef(null);

    const { notes, fetchNotes, editNote } = context;

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated sucessfully", "success");

    }

    const handleonChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "personal" });


    return (
        <>
            <AddNote showAlert = {props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex='-1' aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label" >Title address</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={handleonChange} minLength = {5} required value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label" >Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={handleonChange} minLength = {5} required value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label" >Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={handleonChange} minLength = {5} required value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref = {refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled  = {note.etitle.length <5 || note.edescription.length <5 } onClick = {handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3" >
                <h2>Your Notes</h2>
                <div className="container mx-2">

                {notes.length === 0 && "No notes to display"}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert = {props.showAlert}/>
                    })
                }
            </div>
        </>
    )
}
