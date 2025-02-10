import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Employees from './Componetns/EmployeeTable/Employees';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<Employees/>}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
