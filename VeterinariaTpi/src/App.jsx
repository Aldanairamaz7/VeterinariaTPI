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
import ErrorForbidden from "./components/error/ErrorForbidden";
import AdminUserView from "./components/AdminUserView/AdminUserView";
import AdminUserPetView from "./components/AdminUserPetView/AdminUserPetView";
import VeterinarianPanel from "./components/VeterinarianPanel/VeterinarianPanel";
import AdminPetView from "./components/AdminPetView/AdminPetView";
import ShiftHistory from "./components/ShiftHistory/ShiftHistory";
import AdminSpeView from "./components/AdminSpeView/AdminSpeView";
import EditSpeciality from "./components/EditSpeciality/EditSpeciality";

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
            <Route path="/solicitarturno/:idPet" element={<RequestShift />} />
            <Route path="/editpet/:petId" element={<EditPet />} />
            <Route path="/editarperfil/:userId" element={<EditProfile />} />
            <Route path="/:userId/misturnos" element={<ShiftHistory />} />
            <Route path="/panelveterinario" element={<VeterinarianPanel />} />

            <Route element={<Protected requireAdmin={true} />}>
              <Route path="/adminpanel" element={<AdminPanel />} />
              <Route path="/adminpanel/users" element={<AdminUserView />} />
              <Route path="/adminpanel/pets" element={<AdminPetView />} />
              <Route
                path="/adminpanel/users/:id/pets"
                element={<AdminUserPetView />}
              />
              <Route
                path="/adminpanel/specialities"
                element={<AdminSpeView />}
              />
              <Route
                path="/editspeciality/:idSpe"
                element={<EditSpeciality />}
              />
            </Route>
            <Route path="/veterinarian/:userId/shifts" element={<VeterinarianPanel />} />
          </Route>
          <Route path="*" element={<ErrorNotFound />} />
          <Route path="/unauthorized" element={<ErrorForbidden />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
