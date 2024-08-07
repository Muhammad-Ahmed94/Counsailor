import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import ChatRomm from "./components/ChatRoom"

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chatroom" element={<ChatRomm />} />
      </Routes>
  )
}

export default App