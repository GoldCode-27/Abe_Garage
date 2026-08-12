//Import express module
import express from'express'

const router = express.Router();
//import installController
import instalController from'../controllers/install.controller';
//create a route to handle the install request on get
router.get('/install', instalController.install );

export default router;