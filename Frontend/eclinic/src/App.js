import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import Register from './Component/Patient/Registraion/Register';
import Login from './Component/Patient/Registraion/Login';
import InsuranceForm from './Component/Patient/Registraion/InsuranceForm';
import PatientHomePage from './Component/Patient/Appoinment/PatientHomePage';
import SlotBooking from './Component/Patient/Appoinment/SlotBooking';
import PatientHistory from './Component/Patient/History/PatientHistory';
import InsuranceDetails from './Component/Patient/Insurance/InsuranceDetails';
import NoInsurance from './Component/Patient/Insurance/NoInsurance';
import PatientProfile from './Component/Patient/Profile/PatientProfile';
function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
              <Route path='/' element={<Register/>}/>
              <Route path='Patientlogin/' element={<Login/>}/> 
              <Route path='InsuranceForm/' element={<InsuranceForm/>}/> 
              <Route path='PatientDashboard/' element={<PatientHomePage/>}/>
              <Route path='SlotBooking/' element={<SlotBooking/>}/> 
              <Route path='history/' element={<PatientHistory/>}/> 
              <Route path='InsuranceDetails/' element={<InsuranceDetails/>}/> 
              <Route path='NoInsurance/' element={<NoInsurance/>}/> 
              <Route path='PatientProfile/' element={<PatientProfile/>}/>
              
          

          </Routes>
       </Router>
    </div>
  );
}

export default App;
