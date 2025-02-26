import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import SchoolCollaboration from './Components/SchoolColaboration'
import DataDisplay from './Components/DataDisplay'
import DisplayData from './Components/FetchData/DisplayData'
import DisplaySchoolData from './Components/FetchData/DisplaySchoolData'
import BookManagementSystem from './Components/BookManagementSystem/BookManagementSystem'
import AddBook from './Components/BookManagementSystem/AddBook'
import BookList from './Components/BookManagementSystem/BookList'
import UpdateBook from './Components/BookManagementSystem/UpdateBook'
import BookDetails from './Components/BookManagementSystem/BookDetails'
import Navbar1 from './Components/Navbar1'
import "leaflet/dist/leaflet.css";

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div >
    <BrowserRouter>
    <Navbar1/>
    <Routes>
    <Route path ='/' element={<SchoolCollaboration/>}/>
    {/* <Route path ='/bookmanagementsystem' element={<BookManagementSystem/>}/> */}
    <Route path="/add-book" element={<AddBook />} />
    <Route path="/books" element={<BookList />} />
    <Route path="/update/:id" element={<UpdateBook />} />
    <Route path="/details/:id" element={<BookDetails />} />


    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
