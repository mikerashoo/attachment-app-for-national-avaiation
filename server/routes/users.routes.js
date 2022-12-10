module.exports = (app) => {
    const App = require("../controllers/users.controller.js");
   
  
    app.get("/get-all", App.findAll); 
  };