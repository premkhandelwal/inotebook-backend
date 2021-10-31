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

function App() {
  return (
    <>
      <NotesState>
        <Router>
          <Navbar />
          <Alert message= "Mogambo khush hua"/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signUp">
                <SignUp />
              </Route>

            </Switch>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
