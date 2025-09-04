import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

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
import DoctorRegister from './Component/Doctor/Registration/DoctorRegister';
import DoctorLogin from './Component/Doctor/Registration/DoctorLogin';
import DoctorProfile from './Component/Doctor/Profile/DoctorProfile';
import DoctorProfilePage from './Component/Doctor/Profile/DoctorProfilePage';
import PrescrptionForm from './Component/Doctor/DoctorAppoinments/PrescrptionForm';
import { DoctorProvider } from './Component/Doctor/Context/DoctorContext';
import SetSlots from './Component/Doctor/Profile/SetSlots';
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
              <Route path='DoctorRegister/' element={<DoctorRegister/>}/>
              <Route path='DoctorLogin/' element={<DoctorLogin/>}/>
              <Route path='DoctorProfile/' element={<DoctorProfile/>}/>
              <Route path='DoctorProfilePage/' element={<DoctorProfilePage/>}/>
              <Route path='SetSlots/' element={<SetSlots/>}/>

              <Route path='PresciptionForm/' element={    
                <DoctorProvider>

                <PrescrptionForm/>  

                </DoctorProvider>         
                }/>
              

          </Routes>
                

       </Router>
         <ToastContainer position="top-center" autoClose={2000} theme="light" />

    </div>
  );
}

export default App;
