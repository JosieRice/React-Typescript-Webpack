import { Routes, Route } from "react-router-dom";
import Signin from "./routes/signin/Index";
import Home from "./routes/home/Index";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signin" element={<Signin />} />
    </Routes>
  );
};

export default Router;