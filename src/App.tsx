import { Routes, Route } from 'react-router-dom'
import MainNavBar from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import About from './pages/About'
import Home from './pages/Home'
import Store from './pages/Store'


function App() {
  return (
    <ShoppingCartProvider>
      <MainNavBar></MainNavBar>
      <div className='container mx-auto mb-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </ShoppingCartProvider>
  )
}

export default App
