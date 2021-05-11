import Schedule from "./components/Schedule";
import { Navbar } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Academic Scheduler
        </Navbar.Brand>
      </Navbar>
      <Schedule/>
    </div>
  );
}

export default App;
