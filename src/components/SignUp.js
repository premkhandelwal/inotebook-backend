import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const SignUp = (props) => {
  const handleonChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch('http://localhost:5000/api/auth/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      history.push("/");
      props.showAlert("Account created successfully", "success");

    } else {
      props.showAlert("Invalid credentials", "danger");
    }

  }

  return (
    <div className="container mt-2">
      <h2 className="my-3">Create an account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name="name" onChange={handleonChange} required minLength={2} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleonChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={handleonChange} required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="cpassword" className="form-control" id="cpassword" name="cpassword" onChange={handleonChange} required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
