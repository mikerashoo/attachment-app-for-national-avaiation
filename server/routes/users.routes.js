export default (app) => {
    const App = require("../controllers/users.controller.js");
    app.get("/get-all", App.findAll); 
    app.get("/add", App.addUser); 
  };