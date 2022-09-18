import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import CRUD from "./pages/CRUD";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/calendar" exact element={<Calendar />} />
      </Routes>
      <Routes>
        <Route path="/edit" exact element={<CRUD />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
