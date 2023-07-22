import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { Home } from "./Pages/Home/Home";
import { Privateroute } from "./Pages/Private/Privateroute";
import { Create } from "./Pages/Create/Create";
import { Edit } from "./Pages/Edit/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Privateroute />}>
          <Route path="create" element={<Create />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
