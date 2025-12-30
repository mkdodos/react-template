import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dropdown from "./pages/Dropdown";
import Table from "./pages/Table";
import Menu from "./pages/Menu";
import Button from "./pages/Button";
import Grid from "./pages/Grid";
import Tab from "./pages/Tab";
import Form from "./pages/Form";
import Modal from "./pages/Modal";

import Crud from "./pages/Crud"
import Dish from "./pages/Dish"
import DishCate from "./pages/DishCate"
import Dishes from "./pages/Dishes"
import MasterDetail from "./pages/MasterDetail"

import { Container, Divider } from "semantic-ui-react";

export default function App() {
  return (
    <>
      <Container>
        <Navbar />
        <Divider/>        
        <Routes>
          <Route path="/modal" element={<Modal />} />
          <Route path="/dropdown" element={<Dropdown />} />
          <Route path="/table" element={<Table />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/button" element={<Button />} />
          <Route path="/grid" element={<Grid />} />
          <Route path="/tab" element={<Tab />} />
          <Route path="/form" element={<Form />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/dish" element={<Dish />} />
          <Route path="/dish-cate" element={<DishCate />} />
          <Route path="/dishes" element={<Dishes/>} />
          <Route path="/master-detail" element={<MasterDetail />} />
        </Routes>
      </Container>
    </>
  );
}
