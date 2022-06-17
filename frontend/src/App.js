import { Routes, Route } from "react-router-dom";
import { Home, Login, Profile } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/profile`} element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
