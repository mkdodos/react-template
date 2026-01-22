import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dropdown from "./pages/ui/Dropdown";
import Table from "./pages/ui/Table";
import Menu from "./pages/Menu";
import Button from "./pages/Button";
import Grid from "./pages/Grid";
import Tab from "./pages/Tab";
import Form from "./pages/Form";
import Modal from "./pages/Modal";
import Segment from "./pages/ui/Segment";
import List from "./pages/ui/List";

import Crud from "./pages/Crud";
import DishFood from "./pages/DishFood";
import Dish from "./pages/Dish";
import DishCate from "./pages/DishCate";
import DishPool from "./pages/DishPool";
import Dishes from "./pages/Dishes";
import MasterDetail from "./pages/MasterDetail";
import Meal from "./pages/Meal"

import { Container, Divider } from "semantic-ui-react";

import CalendarDemo from "./components/calendar/CalendarDemo";
import CalendarPDF from "./components/calendar/CalendarPDF";
import Calendar from "./components/calendar/Calendar";
import Test from "./components/test/Test";
// import "./App.css"

export default function App() {
  const routes = [
    { path: "meal", element: <Meal /> },
    { path: "modal", element: <Modal /> },
    { path: "button", element: <Button /> },
    // ... 依此類推
  ];

  return (
    <>
      <Container>
        <Navbar />
        <Divider/>        
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="/test" element={<Test />} />
          <Route path="/calendar-demo" element={<CalendarDemo />} />
          <Route path="/calendar-pdf" element={<CalendarPDF />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/list" element={<List />} />
          <Route path="/segment" element={<Segment />} />
          {/* <Route path="/modal" element={<Modal />} /> */}
          <Route path="/dropdown" element={<Dropdown />} />
          <Route path="/table" element={<Table />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/button" element={<Button />} /> */}
          <Route path="/grid" element={<Grid />} />
          <Route path="/tab" element={<Tab />} />
          <Route path="/form" element={<Form />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/dish-food" element={<DishFood />} />
          <Route path="/dish" element={<Dish />} />
          <Route path="/dish-cate" element={<DishCate />} />
          <Route path="/dish-pool" element={<DishPool />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/master-detail" element={<MasterDetail />} />
        </Routes>
      </Container>
    </>
  );
}
