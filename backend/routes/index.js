//import express server
import express from "express";
//import router from express
const router = express.Router();
//import the employee routes
import employeeRoutes from'../routes/employee.route.js';
//import login route
import loginRoutes from'../routes/login.routes.js';

//Add the employee routes to the main router
router.use(employeeRoutes);
//Add the login routes to the main router
router.use(loginRoutes);

//export the router
 export default router;
