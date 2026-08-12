//import installService to handle communication with database 
import installService from'../services/install.services'
//create a function to handle a install request 
async function install(req, res, next){
//call the installService to install the database
const installMessage = await installService.install();
//check if the install was successfull or not and send approprait message to the client
if(installMessage.status === 200){
    //if successfull, send a response to the client 
    res.status(200).json({
        message: installMessage
    });
}else{
    //is unsuccessfull, send a responce to a client 
    res.status(500).json({
        message:installMesage
    });

 }
}

//export the install function
export default install
