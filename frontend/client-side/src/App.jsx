import './App.css'
import {Routes, Route} from'react-router'

import About from'./markup/pages/About.jsx'
import Home from './markup/pages/Home.jsx'
import Contact from'./markup/pages/Contact.jsx'
import Login from'./markup/pages/Login.jsx'
import Services from'./markup/pages/Services.jsx'
import AddEmployee from './markup/pages/Admin/AddEmployee.jsx'

//Import css files
import "./assets/css/bootstrap.css"
import "./assets/css/style.css"
import "./assets/css/responsive.css"
import "./assets/css/color.css"

// //import custom css
// import "./assets/"

import Header from './markup/components/Header/Header.jsx'
import Footer from './markup/components/Footer/Footer.jsx'


function App() {


  return (
      <>
      <h1>Abegarage Main App</h1>
      <Header />
<Routes>

 <Route path = "/" element = {<Home />} />
 <Route path = "/About" element = {<About />}  />  
 <Route path = "/Login" element = { <Login />} />
 <Route path = "/Contact" element = {<Contact />}   />
 <Route path = '/Services' element = {<Services />}  />
 <Route path = "/AddEmployee" element = {<AddEmployee />} />

</Routes>

<Footer />
      </>
  )
}

export default App
