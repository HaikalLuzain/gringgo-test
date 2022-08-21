import { Table } from "react-bootstrap"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Add from "./pages/Add"
import Edit from "./pages/Edit"
import Home from "./pages/Home"
import View from "./pages/View"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/view/:id" element={<View />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
