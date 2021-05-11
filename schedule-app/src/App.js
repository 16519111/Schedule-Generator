import Schedule from "./components/Schedule";
import { Navbar } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./logo.svg";

function App() {
  return (
    <div className="App mb-5">
      <Navbar bg="dark" variant="dark" fixed="top">
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
      <div style={{marginTop: "70px"}}>
        <Schedule/>
      </div>
    </div>
  );
}

export default App;
