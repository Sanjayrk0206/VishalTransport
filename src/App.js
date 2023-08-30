import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Details } from "./Pages/Details/Details";
import { Batta } from "./Pages/Batta/Batta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Dashboard />} />
          <Route path="/Details" element={<Details />} />
          <Route path="/Payment" element={<Batta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
