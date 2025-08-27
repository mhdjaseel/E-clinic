import './App.css';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import Register from './Component/Patient/Registraion/Register';
import Login from './Component/Patient/Registraion/Login';
import InsuranceForm from './Component/Patient/Registraion/InsuranceForm';
import PatientHomePage from './Component/Patient/Appoinment/PatientHomePage';
import SlotBooking from './Component/Patient/Appoinment/SlotBooking';
import PatientHistory from './Component/Patient/History/PatientHistory';
function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
              <Route path='/' element={<Register/>}/>
              <Route path='Patientlogin/' element={<Login/>}/> 
              <Route path='InsuranceDetails/' element={<InsuranceForm/>}/> 
              <Route path='PatientDashboard/' element={<PatientHomePage/>}/>
              <Route path='SlotBooking/' element={<SlotBooking/>}/> 
              <Route path='history/' element={<PatientHistory/>}/> 
              
          

          </Routes>
       </Router>
    </div>
  );
}

export default App;
