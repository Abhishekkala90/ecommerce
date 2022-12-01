const path = require("path");

const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
  // res.status(errStatus).sendFile(path.join(__dirname+'./../views/error.html'));
  // res.end();
};
module.exports = ErrorHandler;
