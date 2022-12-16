export default (app) => {
    const App = require("../controllers/student.controller.js");
    app.get("/student/test", App.test); 
    app.get("/student/all", App.getAllStudents); 
    app.post("/student/add", App.addStudent); 
  };