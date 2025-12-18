import { Routes, Route, Link } from "react-router-dom";
import ScreenPage from "./pages/ScreenPage";
import MasterPage from "./pages/MasterPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ScreenPage />} />
        <Route path="/master" element={<MasterPage />} />
      </Routes>
    </div>
  );
}
