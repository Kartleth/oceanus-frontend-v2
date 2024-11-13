// src/App.tsx
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Personal from "./pages/Personal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Personal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
