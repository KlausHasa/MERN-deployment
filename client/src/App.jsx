import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import NewPirate from './components/NewPirate';
import Pirates from './components/Pirates';
import EditPirate from './components/EditPirate';
import ViewPirate from './components/ViewPirate';




function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Pirates />}></Route>
          <Route path='/pirate/new' element={<NewPirate />}></Route>
          <Route path='/pirates/:id/update' element={<EditPirate />}></Route>

          <Route path='/pirates/:id/details' element={<ViewPirate />}></Route>


        </Routes>

      </BrowserRouter>

    </div>

  )
}

export default App
