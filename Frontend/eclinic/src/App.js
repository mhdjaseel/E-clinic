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
import DoctorsList from './Component/Patient/Appoinment/DoctorsList';
import AppoinmentDetails from './Component/Patient/Appoinment/AppoinmentDetails';
import ResheduleAppoinment from './Component/Patient/Appoinment/ResheduleAppoinment';
import PatientDetails from './Component/Doctor/DoctorAppoinments/PatientDetails';
import PrescriptionDetails from './Component/Patient/History/PrescriptionDetails';
import PatientsHistory from './Component/Doctor/History/PatientsHistory';
import HomePage from './Component/Homepage/HomePage';
import AdminLogin from './Component/Admin/Profile/AdminLogin';
import AdminDashboard from './Component/Admin/Profile/AdminDashboard';
import AppoinmentRequest from './Component/Patient/Appoinment/AppoinmentRequest';
import CreateAppoinments from './Component/Admin/Appoinments/CreateAppoinments';
function App() {
  return (
    <div className="App">
       <Router>
                

          <Routes>
              <Route path='/' element={<HomePage/>}/>

              <Route path='PatientRegister/' element={<Register/>}/>
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
              <Route path='DoctorsList/' element={<DoctorsList/>}/>
              <Route path='AppoinmentDetails/' element={<AppoinmentDetails/>}/>
              <Route path='ResheduleAppoinment/' element={<ResheduleAppoinment/>}/>
              <Route path='AppoinmentRequest/' element={<AppoinmentRequest/>}/>

              <Route path='PatientDetails/' element={<PatientDetails/>}/>
              <Route path='PrescriptionDetails/' element={<PrescriptionDetails/>}/>
              <Route path='PatientsHistory/' element={<PatientsHistory/>}/>
              <Route path='AdminLogin/' element={<AdminLogin/>}/>
              <Route path='AdminDashboard/' element={<AdminDashboard/>}/>
              <Route path='CreateAppoinments/' element={<CreateAppoinments/>}/>
              
              

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
