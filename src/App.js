import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NotesState from './context/notes/NotesState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {useState} from 'react';

function App() {
  const [alert, setAlert] = useState("");

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);

  }

  return (
    <>
      <NotesState>
        <Router>
          <Navbar />
          <Alert alert = {alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert = {showAlert}/>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert = {showAlert}/>
              </Route>
              <Route exact path="/signUp">
                <SignUp showAlert = {showAlert}/>
              </Route>

            </Switch>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
