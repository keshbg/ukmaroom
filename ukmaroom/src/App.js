import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import { getToken } from './helpers/auth'
import Home from './pages/Home'
import Register from './pages/Register'
import RegisterSuccess from './pages/RegisterSuccess'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [user, setUser] = useState(null)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <Router>
      <Navbar />
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* <Route path='/register' component={Register} />  old way of expressing react route */}
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/success" element={<RegisterSuccess />} />
          </Routes>
        </header>
      </div>
      <Footer />
    </Router>
  )
}

export default App
