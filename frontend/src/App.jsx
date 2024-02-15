import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/navbar.component"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<p>das</p>} />
        <Route path="signup" element={<p>qwerty</p>} />
      </Route>
    </Routes>
  )
}
