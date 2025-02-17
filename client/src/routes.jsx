import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Layout from "./components/dashboard/layout";
import List from "./components/user/list";
import CardList from "./components/user/cardList";

export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
        <Route path="/user/profile" element={<Login/>} />
        <Route path="/user/list" element={<List />} />
        <Route path="/user/card" element={<CardList/>}/>
        </Route>
        {/*
        <Route path="dashboard/addUser" element={}/>
        <Route path="dashboard/updateUser" element={}/> */}
      </Routes>
    </BrowserRouter>
  );
}
