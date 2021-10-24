const swaggerUi = require("swagger-ui-express");
const swaggereJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Expense tracker API",
      version: "1.0.0",
      description: "",
      contact: {
        name: "Sungmin Hong",
        url: "https://github.com/smhong813",
        email: "smhong813@email.com",
      },
    },
    // host: "localhost:8080",
    host: "https://expense-tracker-server-smhong.herokuapp.com",
    basePath: "/api",
  },
  apis: ["./routes/*.js", "./docs/*.js"],
};

const swaggerSpecs = swaggereJSDoc(options);
module.exports = {
  swaggerUi,
  swaggerSpecs,
};
