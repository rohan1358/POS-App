import React from "react";
import Header from "./Header";
import ListProduct from "./ListProduct";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct"
import Login from "./Login"
// import Logout from "./Logout"


import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={ListProduct} />
      <Route path="/add" exact component={AddProduct} />
      <Route path="/edit/:id" exact component={EditProduct} />
      <Route path="/login" exact component={Login}/>
    </BrowserRouter>
  );
}

export default App;
