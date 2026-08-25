import './App.css'
import {Routes, Route} from'react-router'

// import { AuthProvider } from './Contexts/AuthContext.jsx'
import About from'./markup/pages/About.jsx'
import Home from './markup/pages/Home.jsx'
import Contact from'./markup/pages/Contact.jsx'
import Login from'./markup/pages/Login.jsx'
import Services from'./markup/pages/Services.jsx'
import AddEmployee from './markup/pages/Admin/AddEmployee.jsx'
import PrivateAuthRoute from'./markup/components/Auth/PrivateAuthRoute.jsx'
import Orders from './markup/pages/Admin/Orders.jsx'
import Customers from './markup/pages/Admin/Customers.jsx'
import Employees from './markup/pages/Admin/Employees.jsx'
import Unauthorized from './markup/pages/Unauthorized.jsx'

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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* // Add the Orders Route  */}
        <Route path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          } />
        {/* // Add the Customers Route  */}
        <Route path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          } />
        {/* // Add the Employees Route  */}
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          } />
        {/* 
          Customers (/admin/customers) - managers and admins
          Orders (/admin/orders) - Can be accessed by all employees
          Add employee (/admin/add-employee) - admins only 
            - Admin: 3 
            - Manager: 2 
            - Employee: 1 
        */}
      </Routes>
      <Footer />
    </>
  );
}


export default App
