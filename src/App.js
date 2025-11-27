import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Table from "./pages/Table";
import Menu from "./pages/Menu";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/table" element={<Table />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  );
}
