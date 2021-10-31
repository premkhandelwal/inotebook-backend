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

            </Switch>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
