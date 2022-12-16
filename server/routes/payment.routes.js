export default (app) => {
    const App = require("../controllers/payment.controller.js");
    app.get("/payment-form/all", App.getForms); 
    app.post("/payment-form/add", App.addForm);  
    app.get("/payment/all", App.getPayments); 
    app.post("/payment/add", App.addPayment); 
  };