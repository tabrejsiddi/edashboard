import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import "./index.css";
import Footer from "./Components/Footer";
import { SignUp } from "./Components/SignUp";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import ProductList from "./Components/ProductList";
import UpdateProduct from "./Components/UpdateProduct";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />}></Route>

            <Route path="/add" element={<AddProduct />}></Route>
            <Route path="/update/:id" element={<UpdateProduct />}></Route>
            <Route
              path="/logout"
              element={<h1>Deleted product list here</h1>}
            ></Route>
            <Route path="/profile" element={<h1>Profile page </h1>}></Route>
          </Route>

          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};
export default App;
