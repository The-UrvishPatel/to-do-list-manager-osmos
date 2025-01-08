require("express-async-errors");
const express = require("express");
const app = express();
const routes = require("./src/routes/routes");
const notFoundError = require("./src/middlewares/not-found");
const errorHandler = require("./src/middlewares/error-handlers");

//middlewares

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

app.use("/api/todo", routes);

//errors

app.use(notFoundError);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
