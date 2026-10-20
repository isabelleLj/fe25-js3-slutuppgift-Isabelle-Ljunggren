import { Link, Route, Routes } from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/about">About</Link>
      </nav>
      <Button>Klicka här</Button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
