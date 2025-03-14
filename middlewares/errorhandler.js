
const notFound = (req, res) => {
    const error = new Error(`Not Found : ${req.originalUrl}`);
    console.log({ error: error });
    res.status(404).json({
      status: "false",
      message: error.message,
    });
  };
  
  //TO DO(work in progress)
 const errorHandler = (err, req, res) => {
  console.log({ res: res.statusCode });
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = "Internal Server Error";
    // console.log({ Error: err.message })
  
    res.status(statusCode).json({
      status: "error",
      message: message,
    });
  };
  
 
  
  module.exports = { errorHandler, notFound };
  