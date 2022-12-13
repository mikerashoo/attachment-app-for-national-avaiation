export default (app) => {
    const App = require("../controllers/departement.controller.js");
    app.get("/departement/all", App.all); 
    app.post("/departement/add", App.add); 
  };