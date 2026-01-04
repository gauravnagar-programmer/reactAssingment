import { Routes,Route } from "react-router-dom";

import Layout from "./Components/Layout";
import MainList from "./Components/MainList";
import ProductForm from "./Components/Form";

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<MainList/>}/>
        <Route path="product/form" element={<ProductForm/>}/>
    
      </Route>
    </Routes>

  );
};

export default App;
