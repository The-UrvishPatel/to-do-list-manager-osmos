const Invalid = require("../errors/invalid");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof Invalid)
    return res
      .status(err.statusCode)
      .json({ response: "error", message: err.message });

  //   console.log("Something went extremlly wrong!");

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ response: "error", message: "Something went wrong!" });
};

module.exports = errorHandler;
