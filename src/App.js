import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Table from "./pages/Table";

import Menu from "./pages/Menu";
import Button from "./pages/Button";

import { Container, Divider } from "semantic-ui-react";

export default function App() {
  return (
    <>
      <Container>
        <Navbar />
        <Divider/>        
        <Routes>
          <Route path="/table" element={<Table />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/button" element={<Button />} />
        </Routes>
      </Container>
    </>
  );
}
