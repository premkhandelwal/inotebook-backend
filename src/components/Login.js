import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const handleonChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      props.showAlert("Logged in successfully", "success");
      history.push("/")

    } else {
     props.showAlert("Invalid credentials", "danger");
    }

  }
  return (
    <div className = "mt-2">
      <h2 className="my-2">Login to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={credentials.email} onChange={handleonChange} name="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={handleonChange} name="password" id="password" />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
