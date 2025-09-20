import "react-bootstrap";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";
import Footer from "./components/Footer/Footer";
import UserNavbar from "./components/UserNavbar/UserNavbar";
import UserPanel from "./components/UserPanel/UserPanel";
import Body from "./components/Body/Body";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import AddPets from "./components/AddPets/AddPets";
import RequestShift from "./components/RequestShift/RequestShift";
import { ToastContainer } from "react-toastify";
import EditPet from "./components/editPet/EditPet";
import EditProfile from "./components/EditProfile/EditProfile";


function App() {
  return (
    <>
      <BrowserRouter>
      <CustomNavbar />
        <Routes>
          <Route index element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userpanel" element={<UserPanel />}/>
          <Route path="/addpets" element={<AddPets />} />
          <Route path="/solicitarturno" element={<RequestShift />} />
          <Route path="/editarmascota" element={<EditPet />} />
          <Route path="/editarperfil" element={<EditProfile />}/>
        </Routes>
      <ToastContainer />
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
