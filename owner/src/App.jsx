import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/LoginForm";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import FeedBack from "./pages/FeedBack";
import TabBar from "./components/TabBar";

function App() {
  const location = useLocation();
  const isLoginScreen = location.pathname === "/";

  return (
    <>
      {!isLoginScreen && <TabBar />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/feedback" element={<FeedBack />} />
      </Routes>
    </>
  );
}

export default App;
