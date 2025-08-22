import './App.css';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import Register from './Component/Patient/Registraion/Register';
import Login from './Component/Patient/Registraion/Login';
import InsuranceForm from './Component/Patient/Registraion/InsuranceForm';
function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
              <Route path='/' element={<Register/>}/>
              <Route path='Login/' element={<Login/>}/> 
              <Route path='InsuranceDetails/' element={<InsuranceForm/>}/> 

          </Routes>
       </Router>
    </div>
  );
}

export default App;
