import "react-bootstrap";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";
import Footer from "./components/Footer/Footer";
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
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Protected from "./components/protected/Protected";
import ErrorNotFound from "./components/error/ErrorNotFound";
import ErrorUnauthorized from "./components/error/ErrorUnauthorized";
import AdminUserView from "./components/AdminUserView/AdminUserView";
import AdminUserPetView from "./components/AdminUserPetView/AdminUserPetView";

function App() {
  return (
    <>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route index element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Protected />}>
            <Route path="/userpanel" element={<UserPanel />} />
            <Route path="/addpets" element={<AddPets />} />
            <Route path="/solicitarturno" element={<RequestShift />} />
            <Route path="/editarmascota/:petId" element={<EditPet />} />
            <Route path="/editarperfil" element={<EditProfile />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/adminpanel/users" element={<AdminUserView />} />
            <Route
              path="/adminpanel/users/pets"
              element={<AdminUserPetView />}
            />
          </Route>
          <Route path="*" element={<ErrorNotFound />} />
          <Route path="/unauthorized" element={<ErrorUnauthorized />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
